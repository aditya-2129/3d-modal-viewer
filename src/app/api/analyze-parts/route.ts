import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { createHash } from "crypto";
import { cadQueue } from "@/lib/queue";

const UPLOAD_DIR = process.env.UPLOAD_DIR ?? "/uploads";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileHash = createHash("sha256").update(buffer).digest("hex");

    const jobDir = join(UPLOAD_DIR, `job_${Date.now()}_${fileHash.slice(0, 8)}`);
    await mkdir(jobDir, { recursive: true });
    const fallbackName = `upload_${Date.now()}`;
    const rawName = typeof file.name === "string" && file.name.trim() ? file.name : fallbackName;
    const safeName = rawName.split(/[\\/]/).pop() || fallbackName;
    const filePath = join(jobDir, safeName);
    await writeFile(filePath, buffer);

    const job = await cadQueue.add("analyze-parts", {
      jobType: "analyze-parts",
      filePath,
      fileName: safeName,
      fileHash,
    });

    return NextResponse.json({ jobId: job.id });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? "Failed to process upload" }, { status: 500 });
  }
}