import { Queue } from "bullmq";
import IORedis from "ioredis";

const redisUrl = process.env.REDIS_URL ?? "redis://localhost:6379";
if (typeof window === "undefined") {
  console.log(`[queue] Connecting to Redis at: ${redisUrl.replace(/:[^@/]+@/, ":****@")}`);
}

export const connection = new IORedis(redisUrl, {
  maxRetriesPerRequest: null,
});

export type JobType = "process-model" | "analyze-parts";

export interface CadJobPayload {
  jobType: JobType;
  filePath: string;
  fileName: string;
  fileHash: string;
  projectId?: string;
}

export const cadQueue = new Queue<CadJobPayload>("cad-processing", {
  connection,
  defaultJobOptions: {
    attempts: 2,
    backoff: { type: "exponential", delay: 5000 },
    removeOnComplete: { age: 3600 },
    removeOnFail: { age: 86400 },
  },
});
