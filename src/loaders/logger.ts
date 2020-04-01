import { Application } from 'express';
import { expressMiddleware, expressRequestIdMiddleware, logger } from 'express-wolox-logger';

import config from '../config';

export default function loggerLoader(app: Application): Application {
  app.use(expressRequestIdMiddleware());
  if (!config.isTesting) {
    app.use(expressMiddleware({ loggerFn: logger.info }));
  }
  return app;
}
