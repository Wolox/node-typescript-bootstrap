import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import { Application } from 'express';

import { errorHandlerMiddleware } from '../api/middlewares/error_handler';
import routes from '../api';
import config from '../config';

const configApi = config.common.api;

const bodyParserJsonConfig: bodyParser.OptionsJson = {
  limit: configApi.bodySizeLimit
};

const bodyParserUrlencodedConfig: bodyParser.OptionsUrlencoded = {
  extended: true,
  parameterLimit: configApi.parameterLimit
};

export default function expressLoader(app: Application): void {
  /**
   * Enable Cross Origin Resource Sharing to all origins by default
   * More info: https://www.npmjs.com/package/cors
   */
  app.use(cors());
  /**
   * Enable compression on all responses.
   * More info: https://www.npmjs.com/package/compression
   */
  app.use(compression());
  /**
   * Set default HTTP headers to secure endpoints.
   * More info: https://www.npmjs.com/package/helmet
   */
  app.use(helmet());
  /**
   * Middleware that transforms the raw string of req.body into json
   * Client must send "Content-Type: application/json" header
   * More info: https://www.npmjs.com/package/body-parser
   */
  app.use(bodyParser.json(bodyParserJsonConfig));
  app.use(bodyParser.urlencoded(bodyParserUrlencodedConfig));
  /**
   * Load API routes and add prefix to them
   */
  app.use(configApi.prefix, routes());
  /**
   * Middleware to handle internal errors errors
   */
  app.use(errorHandlerMiddleware);
}
