export type EnvironmentVariables = {
  ADMIN_PASSWORD: string;
  CONVERTKIT_API_KEY: string;
  CONVERTKIT_FORM_ID: string;
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
