import { inspect } from 'util';

import { Response, NextFunction } from 'express';

import * as ErrorCode from '../errors';
import logger from '../../logger';

const DEFAULT_STATUS_CODE = 500;

const statusCodes = {
  [ErrorCode.DATABASE_ERROR]: 503,
  [ErrorCode.DEFAULT_ERROR]: 500,
  [ErrorCode.AUTH_ERROR]: 401,
  [ErrorCode.NOT_FOUND]: 404
};

export function handle(
  error: { internalCode: string | number; message: string },
  req: unknown,
  res: Response,
  next: NextFunction
): Response | void {
  if (error.internalCode) {
    res.status(statusCodes[error.internalCode] || DEFAULT_STATUS_CODE);
  } else {
    // Unrecognized error, notifying it to rollbar.
    res.status(DEFAULT_STATUS_CODE);
    return next(error);
  }
  logger.error(inspect(error));
  return res.send({ message: error.message, internal_code: error.internalCode });
}
