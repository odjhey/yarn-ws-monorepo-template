import { ConsoleLogger, type Logger } from "@repo/cross-concerns";

type Shared = {
  logger: Logger;
};

export const shared: Shared = {
  logger: ConsoleLogger(),
};
