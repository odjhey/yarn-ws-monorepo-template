export type Logger = {
  info: (payload: object, ...args: string[]) => void;
  error: (payload: object, ...args: string[]) => void;
  warn: (payload: object, ...args: string[]) => void;
};
