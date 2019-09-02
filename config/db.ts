import customConfig from './index';
const { database } = customConfig.common;

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

export default dbConfiguration;
