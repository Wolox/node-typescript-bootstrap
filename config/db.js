const ENVIRONMENT = process.env.NODE_ENV || 'development';
if (ENVIRONMENT !== 'production') {
  require('dotenv').config();
}
// eslint-disable-next-line @typescript-eslint/no-var-requires
const dbEnvConfig = require(`./${ENVIRONMENT}`);

const database = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  name: dbEnvConfig.config.common.database.name
};

const dbConfiguration = {
  development: {
    username: database.username,
    password: database.password,
    database: database.name,
    host: database.host,
    dialect: 'postgres',
    logging: true
  },
  testing: {
    username: database.username,
    password: database.password,
    database: database.name,
    host: database.host,
    dialect: 'postgres',
    logging: false
  },
  production: {
    username: database.username,
    password: database.password,
    database: database.name,
    host: database.host,
    dialect: 'postgres',
    logging: false
  }
};

module.exports = dbConfiguration;
