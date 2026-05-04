import "dotenv/config";
import { Worker, Job } from "bullmq";
import { spawn } from "child_process";
import { existsSync, mkdirSync } from "fs";
import { readFile, rm } from "fs/promises";
import { join } from "path";
import { Client, Databases, Storage, ID, Query } from "node-appwrite";
import IORedis from "ioredis";
import { CadJobPayload } from "../src/lib/queue";

console.log(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT);
console.log(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);
console.log(process.env.APPWRITE_API_KEY);

// ── Appwrite client ──────────────────────────────────────────────────────────
function getAppwriteClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
    .setKey(process.env.APPWRITE_API_KEY!);
  return { databases: new Databases(client), storage: new Storage(client) };
}

const DB_ID = process.env.APPWRITE_DATABASE_ID ?? "3d-modal-viewer-database";
const BUCKET_ID = process.env.APPWRITE_MESH_BUCKET_ID ?? "glb-meshes";

// ── FreeCAD Python resolution ────────────────────────────────────────────────
const FREE_CAD_BASE = existsSync("/snap/freecad/current") 
  ? "/snap/freecad/current" 
  : (existsSync("/snap/freecad/2337") ? "/snap/freecad/2337" : "/snap/freecad/current");

const KF6_BASE = existsSync("/snap/kf6-core24/current")
  ? "/snap/kf6-core24/current"
  : (existsSync("/snap/kf6-core24/36") ? "/snap/kf6-core24/36" : "/snap/kf6-core24/current");

const SNAP_LIB_DIRS = [
  join(FREE_CAD_BASE, "usr/lib"),
  join(FREE_CAD_BASE, "usr/lib/x86_64-linux-gnu"),
  join(KF6_BASE, "usr/lib/x86_64-linux-gnu"),
  "/usr/lib/freecad/lib",
  "/usr/lib/freecad-python3/lib",
  "/usr/lib/x86_64-linux-gnu/freecad/lib",
];

const TRIMESH_PATHS = [
  join(process.cwd(), ".python-packages"),
  "/usr/local/lib/python3.9/dist-packages",
  "/usr/local/lib/python3.12/dist-packages",
  "/home/aditya/.local/lib/python3.12/site-packages",
  "/root/.local/lib/python3.12/site-packages",
].filter(existsSync);

function resolveFreeCADPython(): string {
  if (process.env.FREECAD_PYTHON) return process.env.FREECAD_PYTHON;
  if (process.platform === "win32") return "C:\\Program Files\\FreeCAD 1.1\\bin\\python.exe";
  const snapPy = join(FREE_CAD_BASE, "bin/python3");
  if (existsSync(snapPy)) return snapPy;
  // Nix store — find FreeCAD's own Python so versions match
  try {
    const { globSync } = require("glob");
    for (const pattern of ["/nix/store/*freecad*/bin/python3", "/nix/store/*freecad*/bin/python"]) {
      const matches: string[] = globSync(pattern).sort().reverse();
      if (matches.length) return matches[0];
    }
  } catch { /* glob unavailable, fall through */ }
  return "python3";
}

function buildEnv(): NodeJS.ProcessEnv {
  const env = { ...process.env };
  const snapLibs = SNAP_LIB_DIRS.filter(existsSync).join(":");
  if (snapLibs) {
    env.LD_LIBRARY_PATH = env.LD_LIBRARY_PATH ? `${snapLibs}:${env.LD_LIBRARY_PATH}` : snapLibs;
    // Also add to PYTHONPATH so "import FreeCAD" works
    env.PYTHONPATH = env.PYTHONPATH ? `${snapLibs}:${env.PYTHONPATH}` : snapLibs;
  }
  if (TRIMESH_PATHS.length) {
    const pypath = TRIMESH_PATHS.join(":");
    env.PYTHONPATH = env.PYTHONPATH ? `${pypath}:${env.PYTHONPATH}` : pypath;
  }
  return env;
}

const FREECAD_PYTHON = resolveFreeCADPython();
const SCRIPTS_DIR = join(process.cwd(), "scripts");

// ── Spawn helper ─────────────────────────────────────────────────────────────
function runPython(script: string, args: string[], timeoutMs: number): Promise<{ result?: any; stderr: string; error?: string }> {
  return new Promise((resolve) => {
    const proc = spawn(FREECAD_PYTHON, [script, ...args], {
      timeout: timeoutMs,
      env: buildEnv(),
    });
    let stdout = "";
    let stderr = "";
    proc.stdout.on("data", (d) => { stdout += d.toString(); });
    proc.stderr.on("data", (d) => { stderr += d.toString(); });
    proc.on("close", (code) => {
      const s = stdout.indexOf("__RESULT__");
      const e = stdout.indexOf("__END__");
      if (s !== -1 && e !== -1) {
        try {
          return resolve({ result: JSON.parse(stdout.slice(s + 10, e)), stderr });
        } catch {}
      }
      const jsonMatch = stdout.match(/(\{[\s\S]*\})\s*$/);
      if (jsonMatch) {
        try {
          return resolve({ result: JSON.parse(jsonMatch[1]), stderr });
        } catch {}
      }
      resolve({ error: `FreeCAD exited ${code}. stderr: ${stderr.slice(-500)}`, stderr });
    });
    proc.on("error", (err) => resolve({ error: err.message, stderr }));
  });
}

// ── Worker ───────────────────────────────────────────────────────────────────
const connection = new IORedis(process.env.REDIS_URL ?? "redis://localhost:6379", {
  maxRetriesPerRequest: null,
});

const worker = new Worker<CadJobPayload>(
  "cad-processing",
  async (job: Job<CadJobPayload>) => {
    const { jobType, filePath, fileName, fileHash, projectId } = job.data;
    const outDir = `${filePath}_out`;
    mkdirSync(outDir, { recursive: true });

    const { databases, storage } = getAppwriteClient();

    // Cache check — skip if already done for this file hash
    try {
      const existing = await databases.listDocuments(DB_ID, "analysis", [
        Query.equal("file_hash", fileHash),
      ]);
      if (existing.documents.length > 0) {
        const doc = existing.documents[0];
        if (doc.status === "complete" && doc.glb_url) {
          if (projectId) {
            await databases.updateDocument(DB_ID, "projects", projectId, { analysisId: doc.$id });
          }
          return { cached: true, analysisId: doc.$id };
        }
      }
    } catch {}

    await job.updateProgress(10);

    if (jobType === "analyze-parts") {
      // extract_parts.py — parts metadata only, no GLB
      const script = join(SCRIPTS_DIR, "extract_parts.py");
      const { result, error } = await runPython(script, [filePath, outDir], 60000);
      if (error || !result) throw new Error(error ?? "extract_parts returned no result");

      await job.updateProgress(90);
      await rm(outDir, { recursive: true, force: true }).catch(() => {});
      return { parts: result.parts ?? result };
    }

    // process_model.py — GLB conversion + parts
    const script = join(SCRIPTS_DIR, "process_model.py");
    const { result, error } = await runPython(script, [filePath, outDir], 120000);
    if (error || !result) throw new Error(error ?? "process_model returned no result");

    await job.updateProgress(60);

    const { parts, mapping, glbPath } = result;

    console.log(`[worker] Python result keys:`, Object.keys(result));
    if (!glbPath) {
      console.log(`[worker] Python result:`, result);
      throw new Error(`Missing glbPath in Python result`);
    }

    const glbBuffer = await readFile(glbPath);
    const uploaded = await storage.createFile(
      BUCKET_ID,
      ID.unique(),
      new File([glbBuffer], `${fileHash}.glb`, { type: "model/gltf-binary" })
    );
    const glbUrl = `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${uploaded.$id}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`;

    await job.updateProgress(80);

    const analysisDoc = await databases.createDocument(DB_ID, "analysis", ID.unique(), {
      file_hash: fileHash,
      status: "complete",
      parts_data: JSON.stringify(parts),
      mapping: JSON.stringify(mapping),
      glb_url: glbUrl,
      created_at: new Date().toISOString(),
    });

    if (projectId) {
      await databases.updateDocument(DB_ID, "projects", projectId, { analysisId: analysisDoc.$id });
    }

    await job.updateProgress(100);
    await rm(outDir, { recursive: true, force: true }).catch(() => {});

    return { analysisId: analysisDoc.$id, parts, mapping, meshFileUrl: glbUrl };
  },
  {
    connection,
    concurrency: 2,
  }
);

worker.on("failed", (job, err) => {
  console.error(`[worker] job ${job?.id} failed:`, err.message);
});

worker.on("completed", (job) => {
  console.log(`[worker] job ${job.id} completed`);
});

console.log("[worker] freecad worker started, waiting for jobs…");
