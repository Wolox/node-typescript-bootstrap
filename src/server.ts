import Rollbar from 'rollbar';
import { createConnection, Connection } from 'typeorm';

import app from './app';
import * as migrationsManager from './db/migrations';
import typeOrmConfig from './db/config';
import config from './config';
import logger from './logger';

const { port } = config.common.api;

Promise.resolve()
  .then(() => createConnection(typeOrmConfig))
  .then((connection: Connection) => migrationsManager.check(connection))
  .then(() => {
    if (config.common.rollbar) {
      const rollbar = new Rollbar({
        accessToken: config.common.rollbar.accessToken,
        enabled: !!config.common.rollbar.accessToken,
        environment: config.common.rollbar.environment || config.environment
      });
      app.use(rollbar.errorHandler());
    }

    app.listen(port);

    logger.info(`Listening on port: ${port}`);
  })
  .catch((error: Error) => logger.error(error.stack));
