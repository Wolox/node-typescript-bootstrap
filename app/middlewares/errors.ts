import { inspect } from 'util';

import { Response, NextFunction } from 'express';

import * as ErrorCode from '../errors';
import logger from '../logger';

const DEFAULT_STATUS_CODE = 500;

const statusCodes = {
  [ErrorCode.DATABASE_ERROR]: 503,
  [ErrorCode.DEFAULT_ERROR]: 500,
  [ErrorCode.NOT_FOUND]: 404
};

export const handle = (
  error: { internalCode: string | number; message: string },
  _: unknown,
  res: Response,
  next: NextFunction
): Response => {
  if (error.internalCode) {
    res.status(statusCodes[error.internalCode] || DEFAULT_STATUS_CODE);
  } else {
    // Unrecognized error, notifying it to rollbar.
    next(error);
    res.status(DEFAULT_STATUS_CODE);
  }
  logger.error(inspect(error));
  // eslint-disable-next-line @typescript-eslint/camelcase
  return res.send({ message: error.message, internal_code: error.internalCode });
};
