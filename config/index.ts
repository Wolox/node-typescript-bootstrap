import logger from '../app/logger';

import { IConfig } from '../types/config';
import { DeepPartial } from '../types/utils';

const ENVIRONMENT: string = process.env.NODE_ENV || 'development';

if (ENVIRONMENT !== 'production') {
  // eslint-disable-next-line global-require
  require('dotenv').config();
}

const configFile = `./${ENVIRONMENT}`;
const environmentConfig = require(configFile).config;

const isObject = (variable: unknown): boolean => variable instanceof Object;

/*
 * Deep immutable copy of source object into tarjet object and returns a new object.
 */
const deepMerge = (target: IConfig, source: DeepPartial<IConfig>): IConfig => {
  if (isObject(target) && isObject(source)) {
    return Object.keys(source).reduce(
      (output, key) => ({
        ...output,
        [key]: isObject(source[key]) && key in target ? deepMerge(target[key], source[key]) : source[key]
      }),
      { ...target }
    );
  }
  return target;
};

const config: IConfig = {
  environment: ENVIRONMENT,
  common: {
    database: {
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 5432,
      database: process.env.DB_NAME || 'database',
      username: process.env.DB_USERNAME || 'username',
      password: process.env.DB_PASSWORD || 'password',
      dialect: 'postgres',
      logging: logger.info
    },
    api: {
      bodySizeLimit: process.env.API_BODY_SIZE_LIMIT,
      parameterLimit: process.env.API_PARAMETER_LIMIT,
      port: process.env.PORT
    },
    rollbar: {
      accessToken: process.env.ROLLBAR_ACCESS_TOKEN,
      environment: process.env.ROLLBAR_ENV
    },
    session: {
      header_name: 'authorization',
      secret: process.env.NODE_API_SESSION_SECRET as string
    }
  },
  todos: {
    baseUrl: process.env.TODOS_API_BASE_URL || 'https://jsonplaceholder.typicode.com'
  }
};

const customConfig: IConfig = deepMerge(config, environmentConfig);

export default customConfig;
