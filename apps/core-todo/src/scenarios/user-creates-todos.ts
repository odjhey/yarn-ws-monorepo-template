import type { Result, Empty } from "@repo/utils";

import * as B from "@swan-io/boxed";
import { curry } from "ramda";
import { z } from "zod";

import { Operation } from "../commons";
import * as Validations from "../commons/validations";
import { AuthContext } from "../contexts/auth.context";

export type Deps = {
  saveTodo: (data: {
    username: string;
    todos: string[];
  }) => Promise<Result<{ id: string }[], { failed: Empty }>>;
};

const InputSchema = z.object({ todos: z.array(z.string()) });
type OperationType = Operation<
  AuthContext,
  Deps,
  z.input<typeof InputSchema>,
  Promise<
    Result<
      { todoIds: { id: string }[] },
      { failed: Empty; notAuthorized: Empty; invalidInput: Empty }
    >
  >
>;

export const userCreatesTodos = curry<OperationType>(
  async (ctx, deps, input) => {
    const validateResults = B.Result.Ok(ctx)
      .flatMap(Validations.isAdmin)
      .flatMap(() => Validations.schemaValidate(input, InputSchema));

    if (validateResults.isError()) {
      return { ok: false, errorKind: validateResults.error.errorKind };
    }

    const result = await deps.saveTodo({
      username: ctx.username,
      todos: input.todos,
    });

    if (!result.ok) {
      return { ok: false, errorKind: "failed" };
    }

    return { ok: true, data: { todoIds: result.data } };
  },
);
