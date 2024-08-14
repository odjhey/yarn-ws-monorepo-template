import { Logger } from "./interfaces/logger";

export const ConsoleLogger: Logger = console;
export const NoopLogger: Logger = {
  info: () => {},
  error: () => {},
  warn: () => {},
};
