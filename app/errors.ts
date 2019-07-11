const internalError = (message: any, internalCode: any) => ({
  message,
  internalCode
});

exports.DATABASE_ERROR = 'database_error';
exports.databaseError = (message: any) => internalError(message, exports.DATABASE_ERROR);

exports.DEFAULT_ERROR = 'default_error';
exports.defaultError = (message: any) => internalError(message, exports.DEFAULT_ERROR);

exports.NOT_FOUND = 'not_found';
exports.notFound = (message: any) => internalError(message, exports.NOT_FOUND);
