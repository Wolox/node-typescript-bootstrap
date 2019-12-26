import Rollbar from 'rollbar';
import { createConnection, Connection } from 'typeorm';

import app from './app';
import * as migrationsManager from './migrations';
import typeOrmConfig from './config/typeorm';
import config from './config';
import logger from './app/logger';

const defaultPort = 8080;

const port = config.common.api.port || defaultPort;

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
