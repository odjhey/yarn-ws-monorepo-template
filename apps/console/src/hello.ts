import { curry } from "ramda";

import { CommonContext } from "./context";

export const hello = curry((ctx: CommonContext) => {
  ctx.logger.info({}, "hello");
  return "world";
});

export const hello2 = curry(
  (ctx: CommonContext, args: { someargs: string }) => {
    ctx.logger.info({ args }, "hello");
    return "world" + args.someargs;
  },
);

export const hello2async = curry(
  async (ctx: CommonContext, args: { someargs: string }) => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    ctx.logger.info({ args }, "hello");
    return "world" + args.someargs;
  },
);

type Deps = { db: { getValue: () => Promise<{ ok: true; data: string }> } };
export const helloWithDeps = curry(
  async (ctx: CommonContext, deps: Deps, args: { someargs: string }) => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    ctx.logger.info({ args }, "hello");
    const v = await deps.db.getValue();
    return "world" + args.someargs + v.data;
  },
);
