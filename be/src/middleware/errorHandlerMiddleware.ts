import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import config from '../config/config';

interface ErrorWithStatusCode extends Omit<Error, 'name'> {
  statusCode?: number;
  code?: string;
  name?: string;
  errors?: Record<string, { message: string }>;
  value?: any;
  kind?: string;
  path?: string;
  reason?: Error;
}

const errorHandlerMiddleware = (err: ErrorWithStatusCode, req: Request, res: Response, next: NextFunction) => {
  const defaultError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || 'Something went wrong, please try again later',
  };

  // Handle Mongoose validation errors
  if (err.name === 'ValidationError') {
    defaultError.statusCode = StatusCodes.BAD_REQUEST;
    defaultError.message = Object.values(err.errors || {})
      .map((item) => item.message)
      .join(', ');
  }

  // Handle Mongoose duplicate key errors
  if (err.code === '11000' || err.statusCode === 11000) {
    defaultError.statusCode = StatusCodes.BAD_REQUEST;
    defaultError.message = `Duplicate value entered for ${Object.keys(err.value || {}).join(', ')} field`;
  }

  // Handle Mongoose cast errors
  if (err.name === 'CastError') {
    defaultError.statusCode = StatusCodes.BAD_REQUEST;
    defaultError.message = `Invalid ${err.path}: ${err.value}`;
  }

  // Handle JWT errors
  if (err.name === 'JsonWebTokenError') {
    defaultError.statusCode = StatusCodes.UNAUTHORIZED;
    defaultError.message = 'Invalid authentication token';
  }

  if (err.name === 'TokenExpiredError') {
    defaultError.statusCode = StatusCodes.UNAUTHORIZED;
    defaultError.message = 'Authentication token has expired';
  }

  return res.status(defaultError.statusCode).json({
    message: defaultError.message,
    statusCode: defaultError.statusCode,
    stackError: config.nodeEnv === 'development' ? err.stack : undefined,
  });
};

export default errorHandlerMiddleware;
