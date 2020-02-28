interface InternalError {
  message: string;
  internalCode: string;
}

const setInternalError = (message: string, internalCode: string): InternalError => ({
  message,
  internalCode
});

export const DATABASE_ERROR = 'database_error';
export const databaseError = (message: string): InternalError => setInternalError(message, DATABASE_ERROR);

export const DEFAULT_ERROR = 'default_error';
export const defaultError = (message: string): InternalError => setInternalError(message, DEFAULT_ERROR);

export const AUTH_ERROR = 'auth_error';
export const authError = (message: string): InternalError => setInternalError(message, AUTH_ERROR);

export const NOT_FOUND = 'not_found';
export const notFound = (message: string): InternalError => setInternalError(message, NOT_FOUND);
