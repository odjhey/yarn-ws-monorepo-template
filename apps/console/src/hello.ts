import { ConsoleLogger, SomeLogger } from "@repo/cross-concerns";

const hello = () => {
  console.log("yaharu!");
  ConsoleLogger.info({}, "yaharu!");
  SomeLogger.info({}, "yaharu!");

  return "world";
};

export { hello };
