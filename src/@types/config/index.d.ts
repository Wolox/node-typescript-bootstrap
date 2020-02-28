type ENV_VAR = string | undefined;

type dialect = 'postgres' | 'mysql' | 'sqlite' | 'mssql' | 'oracle';

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
      type: dialect;
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
      header_name: string; // eslint-disable-line @typescript-eslint/camelcase
      secret: string;
    };
  };
  todos: {
    baseUrl: ENV_VAR;
  };
}
