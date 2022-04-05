export type EnvironmentVariables = {
  DATABASE_URL: string;
};

declare global {
  namespace NodeJS {
    type ProcessEnv = EnvironmentVariables;
  }
}

export {};
