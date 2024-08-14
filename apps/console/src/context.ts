import { shared } from "./shared";

export const CommonContext = () => {
  return { logger: shared.logger };
};
