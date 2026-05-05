import { Queue } from "bullmq";
import IORedis from "ioredis";

const redisUrl = process.env.REDIS_URL ?? "redis://127.0.0.1:6379";

export type JobType = "process-model" | "analyze-parts";

export type CadJobPayload = {
  jobType: string;
  fileId: string;
  filePath?: string;
  fileName?: string;
  fileHash: string;
  projectId?: string;
  userId?: string;
};

let connection: IORedis | undefined;
let cadQueue: Queue<CadJobPayload> | undefined;

function getRedisConnection() {
  if (!connection) {
    if (typeof window === "undefined") {
      console.log(
        `[queue] Connecting to Redis at: ${redisUrl.replace(/:[^@/]+@/, ":****@")}`,
      );
    }

    connection = new IORedis(redisUrl, {
      maxRetriesPerRequest: null,
    });
  }

  return connection;
}

export function getCadQueue() {
  if (!cadQueue) {
    cadQueue = new Queue<CadJobPayload>("cad-processing", {
      connection: getRedisConnection(),
      defaultJobOptions: {
        attempts: 2,
        backoff: { type: "exponential", delay: 5000 },
        removeOnComplete: { age: 3600 },
        removeOnFail: { age: 86400 },
      },
    });
  }

  return cadQueue;
}
