import { resolve } from 'path';

import { ConnectionOptions } from 'typeorm';

import config from '.';

const generatePath = (pathToResolve: string): string => resolve(__dirname, '..', pathToResolve);

const typeOrmConfig: ConnectionOptions = {
  ...config.common.database,
  entities: [generatePath('./app/models/**/*')],
  migrations: [generatePath('./migrations/migrations/*')],
  subscribers: [generatePath('./subscribers/**/*')],
  cli: {
    entitiesDir: generatePath('./app/models'),
    migrationsDir: generatePath('./migrations/migrations'),
    subscribersDir: generatePath('./subscribers')
  }
};

export default typeOrmConfig;

module.exports = typeOrmConfig;
