import { inferAsyncReturnType, initTRPC, TRPCError } from '@trpc/server';
import { CreateExpressContextOptions, createExpressMiddleware } from '@trpc/server/adapters/express';
import { ZodError } from 'zod';

import { parseZodError } from '@shorter/validators';

export const createContext = ({ req, res }: CreateExpressContextOptions) => ({});
type Context = inferAsyncReturnType<typeof createContext>;

const t = initTRPC.context<Context>().create({
  errorFormatter: ({ shape, error }) => {
    const errorFormat = {
      ...shape,
      code: undefined,
      data: {
        ...shape.data,
        zodError:
          error.code === 'BAD_REQUEST' && error.cause instanceof ZodError
            ? parseZodError(error.cause.issues)
            : undefined,
      },
    };

    if (error.cause instanceof ZodError) {
      const issues = error.cause.issues;
      const fixedMessage =
        issues.length > 1
          ? issues.map((msg, i) => `${msg.path} - ${msg.message}`)
          : `${issues[0].path} - ${issues[0].message}`;
      errorFormat.message = fixedMessage as any;
    }

    return errorFormat;
  },
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const mergeRouters = t.mergeRouters;

/* TODO: Add Procedures:
  - Auth
  - Admin

  -> maybe other ?
*/
