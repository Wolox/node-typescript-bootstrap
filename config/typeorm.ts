import { ConnectionOptions } from 'typeorm';

import config from '.';

const typeOrmConfig = {
  ...config.common.database,
  entities: ['./dist/app/models/**/*.js'],
  migrations: ['./dist/migrations/migrations/*.js'],
  // subscribers: ['./subscribers/**/*.ts'],
  cli: {
    entitiesDir: './app/models',
    migrationsDir: './migrations/migrations'
    // subscribersDir: './subscribers'
  }
} as ConnectionOptions;

export default typeOrmConfig;

module.exports = typeOrmConfig;
