/* eslint-disable id-length */
import { inspect } from 'util';
import { Request, Response, NextFunction } from 'express';

import logger from '../logger';
import { HTTP_CODES } from '../constants';

const DEFAULT_STATUS_CODE = HTTP_CODES.INTERNAL_SERVER_ERROR;

export interface InternalError {
  internalCode: string;
  message: string;
  statusCode: number;
}

export const createInternalError = (internalCode: string, statusCode: number) => (
  message: string,
  err?: Error
): InternalError => {
  err && logger.error(inspect(err));
  return { message, internalCode, statusCode };
};

export function errorHandlerMiddleware(
  error: InternalError,
  req: Request,
  res: Response,
  next: NextFunction
): Response | void {
  if (error.internalCode) {
    res.status(error.statusCode || DEFAULT_STATUS_CODE);
  } else {
    // Unrecognized error! notifying it to error tracking tool.
    logger.error(inspect(error));
    res.status(DEFAULT_STATUS_CODE);
    return next(error);
  }
  return res.send({ message: error.message, internal_code: error.internalCode });
}
