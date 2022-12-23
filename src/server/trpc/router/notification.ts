import { router, publicProcedure, protectedProcedure } from "../trpc";

export const notificationRouter = router({
  getNotifications: protectedProcedure.query(({ ctx }) => {
    return;
  }),
});
