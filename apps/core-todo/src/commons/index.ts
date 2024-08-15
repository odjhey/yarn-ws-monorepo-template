import { curry } from "ramda";

export type Operation<Ctx, Deps, Inputs, R> = (
  ctx: Ctx,
  deps: Deps,
  inputs: Inputs,
) => R;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const curryOperation = <T extends (...args: any[]) => any>(fn: T) =>
  curry<T>(fn);
