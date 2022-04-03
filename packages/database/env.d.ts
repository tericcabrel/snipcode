export type EnvironmentVariables = {
  DATABASE_URL: string;
  MYSQL_DATABASE: string;
  MYSQL_ROOT_PASSWORD: string;
  NODE_ENV: string;
  SHADOW_DATABASE_URL: string;
};

declare global {
  namespace NodeJS {
    type ProcessEnv = EnvironmentVariables;
  }
}

export {};
