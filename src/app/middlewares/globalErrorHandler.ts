/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { TErrorSources } from '../interface/errorInterface';
import config from '../config';
import handleZodError from '../errors/handleZodError';
import handleValidationError from '../errors/handleValidationError';
import handleCastError from '../errors/handleCastError';
import handleDuplicateError from '../errors/handleDuplicateError';
import AppError from '../errors/AppError';

const globalErrorHandler: ErrorRequestHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // setting default values
  let statusCode = 500;
  let message = 'Something went wrong!';

  let errorSources: TErrorSources = [
    {
      path: '',
      message: 'There is an error',
    },
  ];

  if (err instanceof ZodError) {
    const simplifiedZodError = handleZodError(err);

    statusCode = simplifiedZodError?.statusCode;
    message = simplifiedZodError?.message;
    errorSources = simplifiedZodError?.errorSources;
  } else if (err?.name === 'ValidationError') {
    const simplifiedMongooseError = handleValidationError(err);

    statusCode = simplifiedMongooseError?.statusCode;
    message = simplifiedMongooseError?.message;
    errorSources = simplifiedMongooseError?.errorSources;
  } else if (err?.name === 'CastError') {
    const simplifiedMongooseError = handleCastError(err);

    statusCode = simplifiedMongooseError?.statusCode;
    message = simplifiedMongooseError?.message;
    errorSources = simplifiedMongooseError?.errorSources;
  } else if (err?.code === 11000) {
    const simplifiedMongooseError = handleDuplicateError(err);

    statusCode = simplifiedMongooseError?.statusCode;
    message = simplifiedMongooseError?.message;
    errorSources = simplifiedMongooseError?.errorSources;
  } else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err?.message;
    errorSources = [
      {
        path: '',
        message: err?.message,
      },
    ];
  } else if (err instanceof Error) {
    // statusCode = err.statusCode; //Property 'statusCode' does not exist on type 'Error'.ts(2339)
    message = err?.message;
    errorSources = [
      {
        path: '',
        message: err?.message,
      },
    ];
  }

  // final return
  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    // err,
    stack: config.NODE_ENV === 'development' ? err?.stack : null,
  });
};

export default globalErrorHandler;

/***
 * PATTERN
 *
 * success
 * message
 * errorSources: [
 * path: ""
 * message: ""
 * ]
 * stack
 */
