import { createInternalError } from './middlewares/error_handler';
import { HTTP_CODES } from './constants';

export const AUTHENTICATION_ERROR = 'authentication_error';
export const authenticationError = createInternalError(AUTHENTICATION_ERROR, HTTP_CODES.UNAUTHORIZED);

export const DATABASE_ERROR = 'database_error';
export const databaseError = createInternalError(DATABASE_ERROR, HTTP_CODES.SERVICE_UNAVAILABLE);

export const DEFAULT_ERROR = 'default_error';
export const defaultError = createInternalError(DEFAULT_ERROR, HTTP_CODES.INTERNAL_SERVER_ERROR);

export const NOT_FOUND_ERROR = 'not_found_error';
export const notFoundError = createInternalError(NOT_FOUND_ERROR, HTTP_CODES.NOT_FOUND);

export const ALREADY_EXIST_ERROR = 'already_exist_error';
export const alreadyExistError = createInternalError(ALREADY_EXIST_ERROR, HTTP_CODES.CONFLICT);

export const EXTERNAL_API_ERROR = 'external_api_error';
export const externalApiError = createInternalError(EXTERNAL_API_ERROR, HTTP_CODES.NOT_FOUND);
