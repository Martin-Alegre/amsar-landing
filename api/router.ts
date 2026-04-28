import { createRouter, publicQuery } from "./middleware";
import { leadsRouter } from "./routers/leads";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  leads: leadsRouter,
});

export type AppRouter = typeof appRouter;
