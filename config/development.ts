exports.config = {
  environment: 'development',
  runMode: process.env.RUN_MODE,
  common: {
    database: {
      database: process.env.DB_NAME_DEV
    }
  },
  isDevelopment: true
};
