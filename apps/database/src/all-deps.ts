import type { UserCreatesTodos } from "@repo/core-todo";

type DepsOf<T> = T extends { Deps: infer D } ? D : never;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I,
) => void
  ? I
  : never;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type CombineDeps<T extends { Deps: any }[]> = UnionToIntersection<
  DepsOf<T[number]>
>;

export type AllDeps = CombineDeps<[{ Deps: UserCreatesTodos.Deps }]>;
