import { IConfig } from '../types/config';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const dbConfiguration = require('./db');

const ENVIRONMENT: string = process.env.NODE_ENV || 'development';
if (ENVIRONMENT !== 'production') {
  require('dotenv').config();
}

const configFile = `./${ENVIRONMENT}`;

const isObject = (variable: unknown): boolean => variable instanceof Object;

/*
 * Deep copy of source object into tarjet object.
 * It does not overwrite properties.
 */
const assignObject = <T> (target: T, source: IConfig): T & IConfig | T => {
  if (target && isObject(target) && source && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (!Object.prototype.hasOwnProperty.call(target, key) || target[key] === undefined) {
        target[key] = source[key];
      } else {
        assignObject(target[key], source[key]);
      }
    });
  }
  return target;
};

const config: IConfig = {
  common: {
    database: dbConfiguration[ENVIRONMENT],
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
      // eslint-disable-next-line @typescript-eslint/camelcase
      header_name: 'authorization',
      secret: process.env.NODE_API_SESSION_SECRET
    }
  },
  todos: {
    baseUrl: process.env.TODOS_API_BASE_URL || 'https://jsonplaceholder.typicode.com'
  }
};

const customConfig = require(configFile).config;

assignObject(customConfig, config);

export default customConfig;
