import { BullTask } from "../bullmq-definitions/bull-task";
import { UploadTodoTaskDefinition } from "../task-definitions/upload-todo";

BullTask(UploadTodoTaskDefinition()).spawnWorker();
