import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import cors from 'cors';
import config from './config';
import * as routes from './app/routes';
import * as errors from './app/middlewares/errors';

const { expressMiddleware, expressRequestIdMiddleware } = require('express-wolox-logger');

const DEFAULT_BODY_SIZE_LIMIT = 1024 * 1024 * 10;
const DEFAULT_PARAMETER_LIMIT = 10000;

const bodyParserJsonConfig = () => ({
  parameterLimit: config.common.api.parameterLimit || DEFAULT_PARAMETER_LIMIT,
  limit: config.common.api.bodySizeLimit || DEFAULT_BODY_SIZE_LIMIT
});

const bodyParserUrlencodedConfig = () => ({
  extended: true,
  parameterLimit: config.common.api.parameterLimit || DEFAULT_PARAMETER_LIMIT,
  limit: config.common.api.bodySizeLimit || DEFAULT_BODY_SIZE_LIMIT
});

const app = express();

app.use(cors());

app.use('/docs', express.static(path.join(__dirname, 'docs')));

// Client must send "Content-Type: application/json" header
app.use(bodyParser.json(bodyParserJsonConfig()));
app.use(bodyParser.urlencoded(bodyParserUrlencodedConfig()));
app.use(expressRequestIdMiddleware);

if (!config.isTesting) {
  app.use(expressMiddleware);
}

routes.init(app);

app.use(errors.handle);

export default app;
