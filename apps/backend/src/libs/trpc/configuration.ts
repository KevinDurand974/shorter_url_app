import { DefaultErrorShape, inferAsyncReturnType, initTRPC, TRPCError } from '@trpc/server';
import { CreateExpressContextOptions, createExpressMiddleware } from '@trpc/server/adapters/express';
import { ZodError } from 'zod';

import { parseZodError } from '@shorter/validators';
import { createError401, createError403, createEmailVerifiedError, createBadTokenError } from '@shorter/errors';
import { Payload, verifyToken } from '../../helpers';
import { TokenExpiredError } from 'jsonwebtoken';
import { getDataSource } from '../typeorm';
import { refreshToken } from '../../models';

export const createContext = async ({ req, res }: CreateExpressContextOptions) => {
  return {
    headers: req.headers,
    cookies: req.cookies,
    res,
  };
};
export type Context = inferAsyncReturnType<typeof createContext>;

type ParseZodError = {
  key: any;
  message: any;
}[];

type CustomError = {
  data: {
    zodError?: ParseZodError;
  };
} & DefaultErrorShape;

const t = initTRPC.context<Context>().create({
  errorFormatter: ({ shape, error }) => {
    const errorFormat: CustomError = {
      ...shape,
      data: {
        ...shape.data,
        code: 'INTERNAL_SERVER_ERROR',
        zodError:
          error.code === 'BAD_REQUEST' && error.cause instanceof ZodError
            ? parseZodError(error.cause.issues)
            : undefined,
      },
    };

    if (error.cause instanceof TokenExpiredError) {
      errorFormat.message = 'Token has expired!';
      errorFormat.code = -32001;
      errorFormat.data.code = 'TOKEN_EXPIRED' as any;
      errorFormat.data.httpStatus = 401;
    }

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

const isAuthed = t.middleware(async ({ next, ctx }) => {
  let accessToken = ctx.cookies.usat;

  // if refresh is not defined throw unauth
  if (!ctx.cookies.usrt) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Unauthenticated',
    });
  }

  // Check if cookie exist
  if (!accessToken) {
    // Try to get a new one with refresh
    const datasource = await getDataSource();
    const result = await refreshToken(datasource, ctx);
    accessToken = result.accessToken;
  }

  // Add payload to context if token pass the validation, otherwise throw an error
  try {
    const payload = verifyToken(accessToken, 'access');
    return next({
      ctx: {
        ...ctx,
        payload,
      },
    });
  } catch (err) {
    throw createBadTokenError();
  }
});

const isVerifiedEmail = t.middleware(({ next, ...params }) => {
  const ctx = params.ctx as Context & { payload: Payload };
  if (!ctx.payload.emailVerified) throw createEmailVerifiedError();
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
