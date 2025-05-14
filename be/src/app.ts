import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import { errorHandlerMiddleware } from './middleware';
import tagsRouter from './api/v1/tags/router';

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to api mini library',
  });
});

const v1 = '/api/v1';
app.use(v1, tagsRouter);

//error handler
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  errorHandlerMiddleware(err, req, res, next);
});

export default app;
