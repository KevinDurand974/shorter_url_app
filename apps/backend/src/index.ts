import 'dotenv/config';
import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import createError, { HttpError } from 'http-errors';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { createExpressMiddleware } from '@trpc/server/adapters/express';

import { getDataSource } from './libs/typeorm';
import { mergeRouters, createContext } from './libs/trpc';
import { authRouter, redirectRouter, urlRouter, userRouter } from './libs/trpc/procedures';

console.log(process.env);

type JsonErrorResult = {
  status: number;
  data: {
    message: string;
    errors?: {
      key: string;
      problem: string;
    }[];
  };
};

// CONFIG TRPC HERE
const appRouter = mergeRouters(urlRouter, userRouter, redirectRouter, authRouter);

const app = express();

// NOTE: Middleware
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

// NOTE: TRPC
app.use(
  '/trpc',
  createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

// NOTE: Error Handler
app.use((_req: Request, __res: Response, next: NextFunction) => {
  next(new createError.NotFound());
});
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof HttpError) {
    const json: JsonErrorResult = {
      status: err.status,
      data: {
        message: err.message,
      },
    };
    if (err.zod) json.data.errors = err.zod;
    res.status(err.status).json(json);
  } else {
    res.status(500).json({ status: 500, data: { message: err.message || 'Internal Server Error' } });
  }
});

app.listen(process.env.PORT, async () => {
  try {
    await getDataSource();
    console.log('Database connected');
    console.log(`Server started on port http://localhost:${process.env.PORT}`);
  } catch (err) {
    console.error(err);
  }
});

export type AppRouter = typeof appRouter;
