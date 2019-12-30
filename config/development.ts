exports.config = {
  environment: 'development',
  common: {
    database: {
      database: process.env.DB_NAME_DEV
    }
  },
  isDevelopment: true
};
