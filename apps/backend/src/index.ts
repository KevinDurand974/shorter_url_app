import 'dotenv/config';
import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import { getDataSource } from './datasource';
import routes from './routes';
import createError, { HttpError } from 'http-errors';

const app = express();

// NOTE: Middleware
app.use(express.json());

// NOTE: Router
app.use('/api/v1', routes);

// NOTE: Error Handler
app.use((_req: Request, __res: Response, next: NextFunction) => {
  next(new createError.NotFound());
});
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof HttpError) {
    res.status(err.status).json({ status: err.status, message: err.message });
  } else {
    res.status(500).json({ status: 500, message: 'Internal Server Error' });
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
