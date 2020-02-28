exports.config = {
  environment: 'production',
  common: {
    database: {
      database: process.env.DB_NAME,
      logging: false
    }
  },
  isProduction: true
};
