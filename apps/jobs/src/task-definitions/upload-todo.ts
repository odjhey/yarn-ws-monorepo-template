import { UserUploadsBigFiles } from "@repo/core-todo";
import { Logger } from "@repo/cross-concerns";

// @todo rename this or reimplem as not so clear
export const UploadTodoTaskDefinition = () => ({
  queueName: "upload-todo-001",
  work: async (_data: unknown) => {
    // @todo validate data
    await uploadTodo({ logger: console }, { filename: "todo.txt" });
  },
});

const uploadTodo = async (
  { logger }: { logger: Logger },
  { filename }: { filename: string },
) => {
  const adminUpload = UserUploadsBigFiles.userUploadsBigFiles({
    isAdmin: true,
    username: "admin",
  });

  const withDb = adminUpload({
    readFileContents: async () => ({
      ok: false,
      errorKind: "readFailed",
    }),
    saveTodo: async () => ({
      ok: false,
      errorKind: "failed",
    }),
  });

  const result = await withDb({ filename });
  logger.info({ result }, "job end");
};
