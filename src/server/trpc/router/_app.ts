import { router } from "../trpc";
import { authRouter } from "./auth";
import { classRouter } from "./class";

export const appRouter = router({
  auth: authRouter,
  class: classRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
