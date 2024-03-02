import { MiddlewareModule, MiddlewareRoute } from "$fresh/src/server/types.ts";
import { MiddlewareHandler } from "$fresh/server.ts";
import { context } from "../lib/context.ts";

export const handler: MiddlewareHandler[] = [
  function addContextToStateMiddleware(_, ctx) {
    ctx.state = {
      context,
    };

    return ctx.next();
  },
];
