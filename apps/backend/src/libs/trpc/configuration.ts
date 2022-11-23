import { inferAsyncReturnType, initTRPC, TRPCError } from '@trpc/server';
import { CreateExpressContextOptions, createExpressMiddleware } from '@trpc/server/adapters/express';
import { ZodError } from 'zod';

import { parseZodError } from '@shorter/validators';
import { createError401, createError403 } from '@shorter/errors';
import { Payload, verifyToken } from '../../helpers';

export const createContext = async ({ req, res }: CreateExpressContextOptions) => {
  return {
    headers: req.headers,
    cookies: req.cookies,
    res,
  };
};
export type Context = inferAsyncReturnType<typeof createContext>;

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

const isAuthed = t.middleware(({ next, ctx }) => {
  if (!ctx.headers.authorization) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Unauthenticated',
    });
  }

  const access_token = ctx.headers.authorization?.split(' ')[1];
  if (!access_token) throw createError401('Unauthenticated');

  const payload = verifyToken(access_token, 'access');
  if (!payload) throw createError401('Unauthenticated');

  return next({
    ctx: {
      ...ctx,
      headers: {
        ...ctx.headers,
        authorization: ctx.headers.authorization as string,
      },
      payload,
    },
  });
});

const isVerifiedEmail = t.middleware(({ next, ...params }) => {
  const ctx = params.ctx as Context & { payload: Payload };
  const payload = ctx.payload;
  if (!payload.emailVerified) {
    throw createError403('Please verify your email before you can use this feature.');
  }
  return next({ ctx });
});

export const router = t.router;
export const mergeRouters = t.mergeRouters;
export const publicProcedure = t.procedure;
export const authProcedure = t.procedure.use(isAuthed);
export const verifiedEmailProcedure = t.procedure.use(isAuthed).use(isVerifiedEmail);

/* TODO: Add Procedures:
  - Admin

  -> maybe other ?
*/
