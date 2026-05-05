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
  // Job is waiting — position = waiting jobs ahead + active jobs (those are blocking too)
  const [waiting, active] = await Promise.all([
    cadQueue.getWaiting(),
    cadQueue.getActive(),
  ]);
  const waitPosition = waiting.findIndex(j => j.id === jobId);
  const ahead = (waitPosition === -1 ? 0 : waitPosition) + active.length;
  return NextResponse.json({ status: "queued", progress: 0, ahead });
}
