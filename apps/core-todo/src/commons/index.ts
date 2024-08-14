export type Operation<Ctx, Deps, Inputs, R> = (
  ctx: Ctx,
  deps: Deps,
  inputs: Inputs,
) => R;
