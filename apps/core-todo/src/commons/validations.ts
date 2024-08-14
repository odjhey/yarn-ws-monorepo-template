import type { z } from "zod";

import * as B from "@swan-io/boxed";

import { AuthContext } from "../contexts/auth.context";

export const isAdmin = (v: AuthContext) =>
  v.isAdmin === true
    ? B.Result.Ok(v)
    : B.Result.Error({ errorKind: "notAuthorized" } as const);

export const schemaValidate = (input: unknown, schema: z.Schema) => {
  const validationResult = schema.safeParse(input);
  return validationResult.success
    ? B.Result.Ok(validationResult.data)
    : B.Result.Error({
        errorKind: "invalidInput",
        issues: validationResult.error.issues,
      } as const);
};
