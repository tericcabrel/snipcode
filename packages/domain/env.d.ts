export type EnvironmentVariables = {
  DATABASE_URL: string;
  NODE_ENV: string;
  TEST_DATABASE_URL: string;
};

declare global {
  namespace NodeJS {
    type ProcessEnv = EnvironmentVariables;
  }
}

export {};
