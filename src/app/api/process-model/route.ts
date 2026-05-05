import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";
import { cadQueue } from "@/lib/queue";
import { Client, Databases, Storage, ID, Query } from "node-appwrite";
import { DATABASE_ID } from "@/lib/constants";

function getAppwrite() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
    .setKey(process.env.APPWRITE_API_KEY!);

  return {
    databases: new Databases(client),
    storage: new Storage(client),
  };
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const projectId = formData.get("projectId") as string | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileHash = createHash("sha256").update(buffer).digest("hex");

    const dbId = process.env.APPWRITE_DATABASE_ID ?? DATABASE_ID;
    const bucketId = process.env.APPWRITE_MESH_BUCKET_ID!;

    const { databases, storage } = getAppwrite();

    // ✅ Cache check
    try {
      const existing = await databases.listDocuments(dbId, "analysis", [
        Query.equal("file_hash", fileHash),
      ]);

      if (existing.documents.length > 0) {
        const doc = existing.documents[0];
        if (doc.status === "complete" && doc.glb_url) {
          if (projectId) {
            await databases.updateDocument(dbId, "projects", projectId, {
              analysisId: doc.$id,
            });
          }
          return NextResponse.json({ cached: true, analysisId: doc.$id });
        }
      }
    } catch (err) {
      console.error("[api/process-model] Cache check failed:", err);
    }

    // ✅ Upload file to Appwrite
    const uploaded = await storage.createFile(
      bucketId,
      ID.unique(),
      file
    );

    const fileId = uploaded.$id;

    // ✅ Enqueue job (NO filePath anymore)
    const job = await cadQueue.add("process-model", {
      jobType: "process-model",
      fileId,
      fileName: file.name,
      fileHash,
      projectId: projectId ?? undefined,
    });

    return NextResponse.json({ jobId: job.id, fileId });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to process upload";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}