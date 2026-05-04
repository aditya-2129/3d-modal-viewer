import { NextRequest, NextResponse } from "next/server";
import { cadQueue } from "@/lib/queue";

export async function GET(req: NextRequest) {
  const jobId = req.nextUrl.searchParams.get("jobId");
  if (!jobId) return NextResponse.json({ error: "Missing jobId" }, { status: 400 });

  const job = await cadQueue.getJob(jobId);
  if (!job) return NextResponse.json({ error: "Job not found" }, { status: 404 });

  const state = await job.getState();
  const progress = job.progress as number ?? 0;

  if (state === "completed") {
    return NextResponse.json({ status: "done", progress: 100, result: job.returnvalue });
  }
  if (state === "failed") {
    return NextResponse.json({ status: "failed", progress, error: job.failedReason });
  }
  if (state === "active") {
    return NextResponse.json({ status: "processing", progress });
  }
  return NextResponse.json({ status: "queued", progress: 0 });
}
