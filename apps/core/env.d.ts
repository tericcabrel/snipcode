export type EnvironmentVariables = {
  ADMIN_PASSWORD: string;
  CONVERTKIT_API_KEY: string;
  CONVERTKIT_FORM_ID: string;
  DATABASE_URL: string;
  ENABLE_INTROSPECTION: string;
  GITHUB_CLIENT_ID: string;
  GITHUB_CLIENT_SECRET: string;
  HOST: string;
  PORT: string;
  REDIS_URL: string;
  REQUEST_TIMEOUT: string;
};

declare global {
  namespace NodeJS {
    type ProcessEnv = EnvironmentVariables;
  }
}

export {};
