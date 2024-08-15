import { BullTask } from "./bullmq-definitions/bull-task";
import { UploadTodoTaskDefinition } from "./task-definitions/upload-todo";

const uploadTask = BullTask(UploadTodoTaskDefinition());
uploadTask.createQueue();

async function addJobs() {
  const j = await uploadTask.addJob("josdlfkj1", { filename: "todo.txt" });
  console.log("jobid", j.id);
}

addJobs().finally(() => {
  process.exit(0);
});
