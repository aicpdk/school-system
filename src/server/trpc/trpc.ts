import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";

import { type Context } from "./context";

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape;
  },
});

export const router = t.router;

/**
 * Unprotected procedure
 **/
export const publicProcedure = t.procedure;

/**
 * Reusable middleware to ensure
 * users are logged in
 */
const isAuthed = t.middleware(async ({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  console.log("session exist");

  if (new Date(ctx.session.expires).getTime() < Date.now()) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  console.log("valid expiration date");

  const user = await ctx.prisma.user.findUnique({
    where: { id: ctx.session.user.id },
  });

  if (!user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  console.log("user exist");

  return next({
    ctx: {
      // infers the `session` as non-nullable
      session: { ...ctx.session, user: ctx.session.user },
    },
  });
});

/**
 * Protected procedure
 **/
export const protectedProcedure = t.procedure.use(isAuthed);
