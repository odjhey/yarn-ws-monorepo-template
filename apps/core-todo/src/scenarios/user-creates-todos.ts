import type { Result, Empty } from "@repo/utils";

import { curry } from "ramda";
import { z } from "zod";

type Operation<Ctx, Deps, Inputs, R> = (
  ctx: Ctx,
  deps: Deps,
  inputs: Inputs,
) => R;

const InputSchema = z.object({ todos: z.array(z.string()) });

export const userCreatesTodos = curry<
  Operation<
    { username: string; isAdmin: boolean },
    {
      saveTodo: (data: {
        username: string;
        todos: string[];
      }) => Promise<Result<{ id: string }[], { failed: Empty }>>;
    },
    z.input<typeof InputSchema>,
    Promise<
      Result<
        { todoIds: { id: string }[] },
        { failed: Empty; notAuthorized: Empty; invalidInput: Empty }
      >
    >
  >
>(async (ctx, deps, inputs) => {
  if (!ctx.isAdmin) {
    return { ok: false, errorKind: "notAuthorized" };
  }

  const validatedInput = InputSchema.safeParse(inputs);
  if (validatedInput.success === false) {
    return { ok: false, errorKind: "invalidInput" };
  }

  const result = await deps.saveTodo({
    username: ctx.username,
    todos: inputs.todos,
  });

  if (!result.ok) {
    return { ok: false, errorKind: "failed" };
  }

  return { ok: true, data: { todoIds: result.data } };
});
