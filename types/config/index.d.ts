type ENV_VAR = string | undefined;

export interface Config {
  common: {
    database: {
      host: ENV_VAR,
      port: ENV_VAR,
      username: ENV_VAR,
      password: ENV_VAR
    },
    api: {
      bodySizeLimit?: ENV_VAR,
      parameterLimit?: ENV_VAR,
      port: ENV_VAR
    },
    rollbar?: {
      accessToken: ENV_VAR,
      environment: ENV_VAR
    },
    session: {
      header_name: ENV_VAR,
      secret: ENV_VAR
    }
  },
  todos: {
    baseUrl: ENV_VAR
  }
}
