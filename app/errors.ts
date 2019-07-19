const internalError = (message: string, internalCode: string) => ({
  message,
  internalCode
});

export const DATABASE_ERROR = 'database_error';
export const databaseError = (message: string) => internalError(message, DATABASE_ERROR);

export const DEFAULT_ERROR = 'default_error';
export const defaultError = (message: string) => internalError(message, DEFAULT_ERROR);

export const NOT_FOUND = 'not_found';
export const notFound = (message: string) => internalError(message, NOT_FOUND);
