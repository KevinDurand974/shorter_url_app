import 'dotenv/config';
import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import routes from './routes';
import createError, { HttpError } from 'http-errors';
import morgan from 'morgan';
import cors from 'cors';
import { createExpressMiddleware } from '@trpc/server/adapters/express';

import { getDataSource } from '@libs/typeorm';
import { createContext, mergeRouters } from '@libs/trpc';
import { testRouter } from '@libs/trpc/procedures';

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
const appRouter = mergeRouters(testRouter);

const app = express();

// NOTE: Middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

// NOTE: Router
app.use('/api/v1', routes);

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
