import { inferAsyncReturnType, initTRPC } from '@trpc/server';
import { CreateExpressContextOptions, createExpressMiddleware } from '@trpc/server/adapters/express';

export const createContext = ({ req, res }: CreateExpressContextOptions) => ({});
type Context = inferAsyncReturnType<typeof createContext>;

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;
export const mergeRouters = t.mergeRouters;
