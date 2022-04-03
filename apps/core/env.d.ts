export type EnvironmentVariables = {
  ADMIN_PASSWORD: string;
  DATABASE_URL: string;
  ENABLE_INTROSPECTION: string;
  HOST: string;
  PORT: string;
};

declare global {
  namespace NodeJS {
    type ProcessEnv = EnvironmentVariables;
  }
}

export {};
