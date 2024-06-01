export type EnvironmentVariables = {
  DATABASE_URL: string;
  NODE_ENV: string;
};

declare global {
  namespace NodeJS {
    type ProcessEnv = EnvironmentVariables;
  }
}

export {};
