import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import createError, { HttpError } from 'http-errors';
import morgan from 'morgan';

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

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors()); // FIX: Realy need this?

app.get('*', async (req, res) => {});

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
    res.status(err.status).json(json);
  } else {
    res.status(500).json({ status: 500, data: { message: err.message || 'Internal Server Error' } });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server started on port http://localhost:${process.env.PORT}`);
});
