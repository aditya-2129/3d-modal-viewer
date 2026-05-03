import { NextRequest, NextResponse } from "next/server";
import { spawn } from "child_process";
import { existsSync } from "fs";
import { writeFile, unlink, readFile } from "fs/promises";
import { join } from "path";
import { tmpdir } from "os";
import { createHash } from "crypto";
import { Client, Databases, Storage, ID, Query } from "node-appwrite";

const SNAP_LIB_DIRS = [
  "/snap/freecad/current/usr/lib",
  "/snap/freecad/current/usr/lib/x86_64-linux-gnu",
  "/snap/kf6-core24/current/usr/lib/x86_64-linux-gnu",
];

function resolveFreeCADPython(): string {
  if (process.env.FREECAD_PYTHON) return process.env.FREECAD_PYTHON;
  if (process.platform === "win32") return "C:\\Program Files\\FreeCAD 1.1\\bin\\python.exe";
  const snapPy = "/snap/freecad/current/bin/python3";
  if (existsSync(snapPy)) return snapPy;
  try {
    const { globSync } = require("glob");
    for (const pattern of ["/nix/store/*freecad*/bin/python3", "/nix/store/*freecad*/bin/python"]) {
      const matches: string[] = globSync(pattern).sort().reverse();
      if (matches.length) return matches[0];
    }
  } catch { /* fall through */ }
  return "python3";
}

function buildEnv(): NodeJS.ProcessEnv {
  const env = { ...process.env };
  const extra = SNAP_LIB_DIRS.filter(existsSync).join(":");
  if (extra) {
    env.LD_LIBRARY_PATH = env.LD_LIBRARY_PATH ? `${extra}:${env.LD_LIBRARY_PATH}` : extra;
  }
  return env;
}

const SCRIPT_PATH = join(process.cwd(), "scripts", "process_model.py");

function getAppwriteClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
    .setKey(process.env.APPWRITE_API_KEY!);
  return { databases: new Databases(client), storage: new Storage(client) };
}

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  const projectId = formData.get("projectId") as string | null;

  if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const fileHash = createHash("sha256").update(buffer).digest("hex");

  const { databases, storage } = getAppwriteClient();
  const dbId = process.env.APPWRITE_DATABASE_ID!;
  const bucketId = process.env.APPWRITE_MESH_BUCKET_ID!;

  // Cache check
  try {
    const existing = await databases.listDocuments(dbId, "analysis", [
      Query.equal("file_hash", fileHash),
    ]);
    if (existing.documents.length > 0) {
      const doc = existing.documents[0];
      if (doc.status === "complete" && doc.glb_url) {
        if (projectId) {
          await databases.updateDocument(dbId, "projects", projectId, { analysisId: doc.$id });
        }
        return NextResponse.json({
          parts: JSON.parse(doc.parts_data),
          mapping: JSON.parse(doc.mapping),
          meshFileUrl: doc.glb_url,
          cached: true,
        });
      }
    }
  } catch { /* not found, proceed */ }

  const sessionId = `step_${Date.now()}`;
  const tmpPath = join(tmpdir(), `${sessionId}_${file.name}`);
  const outDir = join(tmpdir(), `${sessionId}_out`);
  await writeFile(tmpPath, buffer);

  try {
    const result = await runProcessModel(tmpPath, outDir);
    if (result.error) return NextResponse.json({ error: result.error }, { status: 500 });

    const { parts, mapping, glbPath } = result;

    const glbBuffer = await readFile(glbPath);
    const uploaded = await storage.createFile(
      bucketId,
      ID.unique(),
      new File([glbBuffer], `${fileHash}.glb`, { type: "model/gltf-binary" })
    );
    const glbUrl = `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/${bucketId}/files/${uploaded.$id}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`;

    const analysisDoc = await databases.createDocument(dbId, "analysis", ID.unique(), {
      file_hash: fileHash,
      status: "complete",
      parts_data: JSON.stringify(parts),
      mapping: JSON.stringify(mapping),
      glb_url: glbUrl,
      created_at: new Date().toISOString(),
    });

    if (projectId) {
      await databases.updateDocument(dbId, "projects", projectId, { analysisId: analysisDoc.$id });
    }

    return NextResponse.json({ parts, mapping, meshFileUrl: glbUrl });
  } finally {
    await unlink(tmpPath).catch(() => {});
  }
}

function runProcessModel(filePath: string, outDir: string): Promise<any> {
  return new Promise((resolve) => {
    const proc = spawn(resolveFreeCADPython(), [SCRIPT_PATH, filePath, outDir], {
      timeout: 120000,
      env: buildEnv(),
    });

    let stdout = "";
    proc.stdout.on("data", (d) => { stdout += d.toString(); });
    proc.stderr.on("data", () => {});

    proc.on("close", (code) => {
      const s = stdout.indexOf("__RESULT__");
      const e = stdout.indexOf("__END__");
      if (s !== -1 && e !== -1) {
        try { resolve(JSON.parse(stdout.slice(s + 10, e))); return; } catch {}
      }
      resolve({ error: `FreeCAD exited ${code}` });
    });
    proc.on("error", (err) => resolve({ error: err.message }));
  });
}
