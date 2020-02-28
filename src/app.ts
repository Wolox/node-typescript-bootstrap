/* eslint-disable @typescript-eslint/no-explicit-any */
import express from 'express';
import 'reflect-metadata';
import bodyParser, { OptionsJson, OptionsUrlencoded } from 'body-parser';
import cors from 'cors';
import logger from './logger';
import config from './config';
import * as routes from './api';
import * as errors from './api/middlewares/errors';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { expressMiddleware, expressRequestIdMiddleware } = require('express-wolox-logger');

const DEFAULT_BODY_SIZE_LIMIT = 1024 * 1024 * 10;
const DEFAULT_PARAMETER_LIMIT = 10000;

const bodyParserJsonConfig: OptionsJson = {
  limit: Number(config.common.api.bodySizeLimit) || DEFAULT_BODY_SIZE_LIMIT
};

const bodyParserUrlencodedConfig: OptionsUrlencoded = {
  extended: true,
  parameterLimit: Number(config.common.api.parameterLimit) || DEFAULT_PARAMETER_LIMIT
};

const app = express();

app.use(cors());

// Client must send "Content-Type: application/json" header
app.use(bodyParser.json(bodyParserJsonConfig));
app.use(bodyParser.urlencoded(bodyParserUrlencodedConfig));

app.use(expressRequestIdMiddleware());
if (!config.isTesting) {
  app.use(expressMiddleware({ loggerFn: logger.info }));
}

routes.init(app);

app.use(errors.handle);

export default app;
