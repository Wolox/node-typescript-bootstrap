import Umzug from 'umzug';

import config from '../config';
import models from '../app/models';
import logger from '../app/logger';

export const check = (): Promise<Umzug.Migration[]> => {
  const umzug = new Umzug({
    logging: logger.info,
    storage: 'sequelize',
    storageOptions: { sequelize: models.sequelize },
    migrations: {
      params: [
        models.sequelize.getQueryInterface(),
        models.sequelize.constructor,
        (): Error => {
          throw new Error('Migration tried to use old style "done" callback.upgrade');
        }
      ],
      path: `${process.cwd()}/dist/migrations/migrations`,
      pattern: /\.js$/
    }
  });
  return umzug.pending().then((migrations: Umzug.Migration[]) => {
    if (migrations.length) {
      if (!config.isProduction) {
        return Promise.reject(new Error('Pending migrations, run: npm run migrations'));
      }
      return umzug.up().catch((err: never) => {
        logger.error(err);
        return Promise.reject(new Error('There are pending migrations that could not be executed'));
      });
    }
    return Promise.resolve([]);
  });
};
