import { BullTask } from "./bullmq-definitions/bull-task";
import { UploadTodoTaskDefinition } from "./task-definitions/upload-todo";

const task = BullTask(UploadTodoTaskDefinition());
task.createQueue();

const main = async () => {
  const jobId = "16";
  const s = await task.getStatus(jobId);
  console.log(s, " status ", jobId);
};

main().finally(() => {
  process.exit(0);
});
