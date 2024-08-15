import type { Result, Empty } from "@repo/utils";

import * as B from "@swan-io/boxed";
import { z } from "zod";

import { curryOperation, Operation } from "../commons";
import * as Validations from "../commons/validations";
import { AuthContext } from "../contexts/auth.context";

export type Deps = {
  saveTodo: (data: {
    username: string;
    todos: string[];
  }) => Promise<Result<{ id: string }[], { failed: Empty }>>;
  readFileContents: (data: {
    filename: string;
  }) => Promise<Result<{ todos: string[] }, { readFailed: Empty }>>;
};

const InputSchema = z.object({ filename: z.string().min(1) });
type OperationType = Operation<
  AuthContext,
  Deps,
  z.input<typeof InputSchema>,
  Promise<
    Result<
      { todoIds: { id: string }[] },
      {
        failed: Empty;
        notAuthorized: Empty;
        invalidInput: Empty;
        failedToRead: Empty;
      }
    >
  >
>;

export const userUploadsBigFiles = curryOperation<OperationType>(
  async (ctx, deps, input) => {
    const validateResults = B.Result.Ok(ctx)
      .flatMap(Validations.isAdmin)
      .flatMap(() => Validations.schemaValidate(input, InputSchema));

    if (validateResults.isError()) {
      return { ok: false, errorKind: validateResults.error.errorKind };
    }

    const contents = await deps.readFileContents({
      filename: validateResults.value.filename,
    });

    if (!contents.ok) {
      return { ok: false, errorKind: "failedToRead" };
    }

    const result = await deps.saveTodo({
      todos: contents.data.todos,
      username: ctx.username,
    });

    if (!result.ok) {
      return { ok: false, errorKind: "failed" };
    }

    return { ok: true, data: { todoIds: result.data } };
  },
);
