// /packages/queue/queue.ts
import { Queue } from "bullmq";

export const noteTasksQueue = new Queue("second-brain", {
  connection: { host: "localhost", port: 6379 },
});

export async function enqueueNote(noteId: string) {
  await noteTasksQueue.add("process-note", { noteId });
}
