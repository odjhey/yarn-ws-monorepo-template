import { ConsoleLogger } from "@repo/logging";

const hello = () => {
  console.log("yaharu!");
  ConsoleLogger.info({}, "yaharu!");

  return "world";
};

export { hello };
