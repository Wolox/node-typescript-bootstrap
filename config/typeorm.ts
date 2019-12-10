import { ConnectionOptions } from 'typeorm';

import config from '.';

const baseDir = config.runMode === 'DEV' || config.isTesting ? '.' : './dist';

const typeOrmConfig = {
  ...config.common.database,
  entities: [`${baseDir}/app/models/**/*.{ts,js}`],
  migrations: [`${baseDir}/migrations/migrations/*.{ts,js}`],
  subscribers: [`${baseDir}/subscribers/**/*.{ts,js}`],
  cli: {
    entitiesDir: './app/models',
    migrationsDir: './migrations/migrations',
    subscribersDir: './subscribers'
  }
} as ConnectionOptions;

export default typeOrmConfig;

module.exports = typeOrmConfig;
