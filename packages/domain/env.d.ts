export type EnvironmentVariables = {
  ADMIN_PASSWORD: string;
  CONVERTKIT_API_KEY: string;
  CONVERTKIT_FORM_ID: string;
  IS_LOCAL: string;
  MYSQL_DATABASE: string;
  MYSQL_PORT: string;
  MYSQL_ROOT_PASSWORD: string;
  NODE_ENV: string;
  PASSWORD_SALT: string;
  TEST_WITH_DB: string;
};

declare global {
  namespace NodeJS {
    type ProcessEnv = EnvironmentVariables;
  }
}

export {};
