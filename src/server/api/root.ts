import { createTRPCRouter } from "@/server/api/trpc";
import { exampleRouter } from "@/server/api/routers/example";
import { userRouter } from "./routers/user";
import { prisma } from "../db";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  user: userRouter,
});

export const appCaller = appRouter.createCaller({
  prisma: prisma,
  session: null,
});
// export type definition of API
export type AppRouter = typeof appRouter;
