import "dotenv/config";
import { Worker, Job } from "bullmq";
import { spawn } from "child_process";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import { readFile, rm } from "fs/promises";
import { join } from "path";
import { Client, Databases, Storage, ID, Query, AppwriteException } from "node-appwrite";
import IORedis from "ioredis";
import type { CadJobPayload } from "../src/lib/queue";
import { DATABASE_ID } from "../src/lib/constants";
import { InputFile } from "node-appwrite/file";

// ── Appwrite ─────────────────────────────────────────
function getAppwriteClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
    .setKey(process.env.APPWRITE_API_KEY!);
  return { databases: new Databases(client), storage: new Storage(client) };
}

const DB_ID = process.env.APPWRITE_DATABASE_ID ?? DATABASE_ID;
const BUCKET_ID = process.env.APPWRITE_MESH_BUCKET_ID ?? "glb-meshes";

const SCRIPTS_DIR = join(process.cwd(), "scripts");

// Detect whether we're running under snap (local dev) or apt (Docker).
// snap FreeCAD: `snap run freecad.cmd -c`
// apt FreeCAD:  `freecadcmd -c`  (xvfb-run wrapper not needed for headless)
function getFreeCADSpawn(): { cmd: string; args: string[] } {
  if (existsSync("/snap/freecad/current")) {
    return { cmd: "snap", args: ["run", "freecad.cmd", "-c"] };
  }
  return { cmd: "freecadcmd", args: ["-c"] };
}

interface PythonResult {
  parts?: unknown[];
  mapping?: unknown[];
  glbPath?: string;
  [key: string]: unknown;
}

async function findCompleteAnalysisByFileHash(
  databases: Databases,
  fileHash: string,
) {
  const existing = await databases.listDocuments(DB_ID, "analysis", [
    Query.equal("file_hash", fileHash),
  ]);

  return existing.documents.find(
    (doc) => doc.status === "complete" && Boolean(doc.glb_url),
  );
}

// ── Python runner ───────────────────────────────────
function runPython(script: string, args: string[], timeoutMs: number) {
  return new Promise<{ result?: PythonResult; error?: string }>((resolve) => {
    console.log("[DEBUG] Running FreeCAD:", script, args);

    // FreeCAD must receive the script via stdin with sys.argv pre-set.
    // Passing the script as a positional arg causes a snap sandbox error,
    // and --pass before the script leaves FreeCAD with no script to run (hangs).
    // This stdin approach works for both snap and apt FreeCAD.
    const escapedArgs = [script, ...args].map(a => a.replace(/'/g, "\\'"));
    const argv = escapedArgs.map(a => `'${a}'`).join(", ");
    const stdin = `import sys; sys.argv = [${argv}]; exec(compile(open('${escapedArgs[0]}', encoding='utf-8').read(), '${escapedArgs[0]}', 'exec'), {'__name__': '__main__', '__file__': '${escapedArgs[0]}'})`;

    const { cmd, args: spawnArgs } = getFreeCADSpawn();
    const proc = spawn(cmd, spawnArgs, {
      timeout: timeoutMs,
      env: { ...process.env, PYTHONIOENCODING: "utf-8", PYTHONUTF8: "1" },
    });

    proc.stdin.write(stdin + "\n");
    proc.stdin.end();

    let stdout = "";
    let stderr = "";

    proc.stdout.on("data", (d) => (stdout += d.toString()));
    proc.stderr.on("data", (d) => (stderr += d.toString()));

    proc.on("close", () => {
      console.log("[DEBUG] PY STDOUT:", stdout);
      console.log("[DEBUG] PY STDERR:", stderr);

      const match = stdout.match(/__RESULT__([\s\S]*?)__END__/);
      if (match) {
        try {
          const parsed = JSON.parse(match[1]);
          if (parsed.error) {
            resolve({ error: parsed.error });
          } else {
            resolve({ result: parsed });
          }
          return;
        } catch {
          resolve({ error: "Failed to parse Python JSON output" });
          return;
        }
      }

      resolve({ error: stderr || "No __RESULT__ block in Python output" });
    });

    proc.on("error", (err) => resolve({ error: err.message }));
  });
}

// ── Worker ──────────────────────────────────────────
const connection = new IORedis(process.env.REDIS_URL!, {
  maxRetriesPerRequest: null,
});

new Worker<CadJobPayload>(
  "cad-processing",
  async (job: Job<CadJobPayload>) => {
    const { jobType, fileId, filePath, fileHash, projectId } = job.data;
    if (!fileId) {
      throw new Error("fileId is required");
    }

    const { databases, storage } = getAppwriteClient();

    await job.updateProgress(5);

    // ── Download file from Appwrite ─────────────────
    let tempPath = "";
    const shouldDeleteTempPath = !filePath;

    if (filePath) {
      // LOCAL MODE
      tempPath = filePath;
      console.log("[worker] Using local file:", tempPath);
    } else if (fileId) {
      // PRODUCTION MODE
      const fileBuffer = await storage.getFileDownload(BUCKET_ID, fileId);
      const uploadsDir = `${process.cwd()}/uploads`;
      mkdirSync(uploadsDir, { recursive: true });
      tempPath = `${uploadsDir}/${fileId}.step`;
      writeFileSync(
        tempPath,
        Buffer.isBuffer(fileBuffer) ? fileBuffer : Buffer.from(fileBuffer),
      );
    } else {
      throw new Error("No filePath or fileId provided");
    }

    const outDir = `${tempPath}_out`;
    mkdirSync(outDir, { recursive: true });

    const cleanupTempArtifacts = async () => {
      await rm(outDir, { recursive: true, force: true }).catch(() => {});
      if (shouldDeleteTempPath) {
        await rm(tempPath, { force: true }).catch(() => {});
      }
    };

    await job.updateProgress(15);

    try {
      // ── Cache check ────────────────────────────────
      const existing = await findCompleteAnalysisByFileHash(databases, fileHash);

      if (existing) {
        if (projectId) {
          await databases.updateDocument(DB_ID, "projects", projectId, {
            analysisId: existing.$id,
          });
        }
        return { cached: true, analysisId: existing.$id };
      }

      await job.updateProgress(20);

      // ── Run Python ────────────────────────────────
      const script =
        jobType === "analyze-parts" ? "extract_parts.py" : "process_model.py";

      console.log("[DEBUG] tempPath:", tempPath);
      console.log("[DEBUG] outDir:", outDir);
      console.log("[DEBUG] file exists:", existsSync(tempPath));

      const { result, error } = await runPython(
        join(SCRIPTS_DIR, script),
        [tempPath, outDir],
        120000,
      );

      if (error || !result) throw new Error(error || "Python failed");

      await job.updateProgress(80);

      // ── Handle analyze only ───────────────────────
      if (jobType === "analyze-parts") {
        return { parts: result.parts ?? result };
      }

      const { glbPath, parts, mapping } = result;

      if (!glbPath) throw new Error("Missing glbPath");

      const glbBuffer = await readFile(glbPath);

      await job.updateProgress(85);

      const uploaded = await storage.createFile(
        BUCKET_ID,
        ID.unique(),
        InputFile.fromBuffer(glbBuffer, `${fileHash}.glb`),
      );

      await job.updateProgress(95);

      const glbUrl = `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${uploaded.$id}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`;

      let doc;
      try {
        doc = await databases.createDocument(
          DB_ID,
          "analysis",
          ID.unique(),
          {
            file_hash: fileHash,
            status: "complete",
            parts_data: JSON.stringify(parts),
            mapping: JSON.stringify(mapping),
            glb_url: glbUrl,
            created_at: new Date().toISOString(),
          },
        );
      } catch (error) {
        const isDuplicateAnalysis =
          error instanceof AppwriteException &&
          error.code === 409 &&
          error.type === "document_already_exists";

        if (!isDuplicateAnalysis) {
          throw error;
        }

        const existing = await findCompleteAnalysisByFileHash(databases, fileHash);
        if (!existing) {
          throw error;
        }

        doc = existing;
      }

      if (projectId) {
        await databases.updateDocument(DB_ID, "projects", projectId, {
          analysisId: doc.$id,
        });
      }

      return { analysisId: doc.$id };
    } finally {
      await cleanupTempArtifacts();
    }

  },
  { connection },
);

console.log("Worker ready");
