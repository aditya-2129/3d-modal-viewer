import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";
import { getCadQueue } from "@/lib/queue";
import { Client, Databases, Storage, ID, Query, Permission, Role } from "node-appwrite";
import { getSessionUser } from "@/lib/auth-server";
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

    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const maxUploadSize = 50 * 1024 * 1024;
    const allowedExtensions = [".step", ".stp", ".iges", ".igs"];
    const fileName = file.name.toLowerCase();
    const hasAllowedExtension = allowedExtensions.some((ext) =>
      fileName.endsWith(ext)
    );

    if (!hasAllowedExtension) {
      return NextResponse.json(
        { error: "Unsupported file type" },
        { status: 400 }
      );
    }

    if (file.size > maxUploadSize) {
      return NextResponse.json(
        { error: "File too large" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileHash = createHash("sha256").update(buffer).digest("hex");

    const dbId = process.env.APPWRITE_DATABASE_ID ?? DATABASE_ID;
    const bucketId = process.env.APPWRITE_MESH_BUCKET_ID!;
    const { databases, storage } = getAppwrite();

    // ✅ Project ownership check
    if (projectId) {
      try {
        const project = await databases.getDocument(dbId, "projects", projectId);
        if (project.userId !== user.$id) {
          return NextResponse.json({ error: "Forbidden: You do not own this project" }, { status: 403 });
        }
      } catch (err) {
        return NextResponse.json({ error: "Project not found or access denied" }, { status: 404 });
      }
    }

    // ✅ Cache check
    try {
      const existing = await databases.listDocuments(dbId, "analysis", [
        Query.equal("file_hash", fileHash),
      ]);

      if (existing.documents.length > 0) {
        const doc = existing.documents[0];
        
        // Security: Ensure current user has permission to this analysis and its GLB
        const permissions = doc.$permissions || [];
        const userReadPermission = Permission.read(Role.user(user.$id));
        
        if (!permissions.includes(userReadPermission)) {
          const newPermissions = [...permissions, userReadPermission];
          
          // Update analysis document permissions
          await databases.updateDocument(dbId, "analysis", doc.$id, {}, newPermissions);
          
          // Update GLB file permissions if file ID exists
          if (doc.glb_file_id) {
            try {
              await storage.updateFile({
                bucketId,
                fileId: doc.glb_file_id,
                permissions: newPermissions,
              });
            } catch (err) {
              console.error("[api/process-model] Failed to update GLB file permissions:", err);
            }
          }
        }

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
    const job = await getCadQueue().add("process-model", {
      jobType: "process-model",
      fileId,
      fileName: file.name,
      fileHash,
      projectId: projectId ?? undefined,
      userId: user.$id,
    });

    return NextResponse.json({ jobId: job.id, fileId });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to process upload";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
