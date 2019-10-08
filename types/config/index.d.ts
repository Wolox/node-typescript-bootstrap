import { Dialect } from 'sequelize';

type ENV_VAR = string | undefined;

export interface IConfig {
  isDevelopment?: boolean;
  isProduction?: boolean;
  isTesting?: boolean;
  environment: string;
  common: {
    database: {
      host: string;
      port: number;
      database: string;
      username: string;
      password: string;
      dialect: Dialect;
      logging: boolean;
    };
    api: {
      bodySizeLimit?: ENV_VAR;
      parameterLimit?: ENV_VAR;
      port: ENV_VAR;
    };
    rollbar?: {
      accessToken: ENV_VAR;
      environment: ENV_VAR;
    };
    session: {
      // eslint-disable-next-line @typescript-eslint/camelcase
      header_name: ENV_VAR;
      secret: ENV_VAR;
    };
  };
  todos: {
    baseUrl: ENV_VAR;
  };
}
