import { resolve } from 'path';

import { ConnectionOptions } from 'typeorm';

import config from '../config';

const generatePath = (pathToResolve: string): string => resolve(__dirname, '..', pathToResolve);

const typeOrmConfig: ConnectionOptions = {
  ...config.common.database,
  entities: [generatePath('./db/models/**/*')],
  migrations: [generatePath('./db/migrations/history/*')],
  subscribers: [generatePath('./db/subscribers/**/*')],
  cli: {
    entitiesDir: './src/db/models',
    migrationsDir: './src/db/migrations/history',
    subscribersDir: './src/db/subscribers'
  }
};

export default typeOrmConfig;

module.exports = typeOrmConfig;
