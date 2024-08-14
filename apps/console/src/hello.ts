import { CommonContext } from "./context";

const hello =
  (ctx = CommonContext()) =>
  () => {
    ctx.logger.info({}, "hello");
    return "world";
  };

export { hello };
