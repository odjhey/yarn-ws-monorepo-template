import { Logger } from "./interfaces/logger";

export const ConsoleLogger: Logger = console;
export const NoopLogger: Logger = {
  info: () => {},
  error: () => {},
  warn: () => {},
};

export const SomeLogger: Logger = {
  info: (...args) => {
    console.log("SomeLogger.info", ...args);
  },
  error: () => {},
  warn: () => {},
};
