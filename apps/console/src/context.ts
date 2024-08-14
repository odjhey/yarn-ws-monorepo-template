import { shared } from "./shared";

export type CommonContext = ReturnType<typeof CommonContext>;
export const CommonContext = () => {
  return { logger: shared.logger };
};
