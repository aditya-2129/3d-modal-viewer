import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { createHash } from "crypto";
import { cadQueue } from "@/lib/queue";
import { Client, Databases, Query } from "node-appwrite";
import { DATABASE_ID } from "@/lib/constants";

const UPLOAD_DIR = process.env.UPLOAD_DIR ?? "/uploads";

function getDb() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
    .setKey(process.env.APPWRITE_API_KEY!);
  return new Databases(client);
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const projectId = formData.get("projectId") as string | null;

    if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileHash = createHash("sha256").update(buffer).digest("hex");
    const dbId = process.env.APPWRITE_DATABASE_ID ?? DATABASE_ID;

    // Cache check — if analysis already complete, return it immediately
    try {
      const db = getDb();
      const existing = await db.listDocuments(dbId, "analysis", [
        Query.equal("file_hash", fileHash),
      ]);
      if (existing.documents.length > 0) {
        const doc = existing.documents[0];
        if (doc.status === "complete" && doc.glb_url) {
          if (projectId) {
            await db.updateDocument(dbId, "projects", projectId, { analysisId: doc.$id });
          }
          return NextResponse.json({ cached: true, analysisId: doc.$id });
        }
      }
    } catch {}

    // Write file to shared volume
    const jobDir = join(UPLOAD_DIR, `job_${Date.now()}_${fileHash.slice(0, 8)}`);
    await mkdir(jobDir, { recursive: true });
    const fallbackName = `upload_${Date.now()}`;
    const rawName = typeof file.name === "string" && file.name.trim() ? file.name : fallbackName;
    const safeName = rawName.split(/[\\/]/).pop() || fallbackName;
    const filePath = join(jobDir, safeName);
    await writeFile(filePath, buffer);

    // Enqueue job
    const job = await cadQueue.add("process-model", {
      jobType: "process-model",
      filePath,
      fileName: safeName,
      fileHash,
      projectId: projectId ?? undefined,
    });

    return NextResponse.json({ jobId: job.id });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? "Failed to process upload" }, { status: 500 });
  }
}