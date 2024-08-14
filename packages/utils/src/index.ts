export type Result<
  T,
  ErrorKind extends Record<string, Record<string, unknown>> = Empty,
> =
  | { ok: true; data: T }
  | ({
      ok: false;
    } & {
      [C in keyof ErrorKind]: {
        errorKind: C;
      } & ErrorKind[C];
    }[keyof ErrorKind]);

export type Empty = Record<never, never>;
