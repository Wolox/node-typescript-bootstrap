type ENV_VAR = string | undefined;

export interface IConfig {
  environment: string;
  common: {
    database: {
      host: ENV_VAR;
      port: ENV_VAR;
      database: ENV_VAR;
      username: ENV_VAR;
      password: ENV_VAR;
      dialect: string;
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
