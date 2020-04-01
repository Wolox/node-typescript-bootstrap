import { Connection } from 'typeorm';

import config from '../../config';
import logger from '../../logger';

export const check = (connection: Connection): Promise<void> =>
  connection.showMigrations().then((pendingMigrations: boolean) => {
    logger.info(`Pending migrations: ${pendingMigrations}`);
    if (pendingMigrations) {
      if (!config.isProduction) {
        return Promise.reject(new Error('Pending migrations, run: npm run migrations'));
      }
      return connection
        .runMigrations({ transaction: 'all' })
        .then(() => {
          logger.info('Migrations successfully executed');
        })
        .catch((err: Error) => {
          logger.error(err);
          return Promise.reject(new Error('There are pending migrations that could not be executed'));
        });
    }
    return Promise.resolve();
  });
