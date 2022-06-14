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
  REQUEST_TIMEOUT: string;
  SENTRY_DSN: string;
  SESSION_LIFETIME: string;
  WEB_APP_URL: string;
  WEB_AUTH_ERROR_URL: string;
  WEB_AUTH_SUCCESS_URL: string;
};

declare global {
  namespace NodeJS {
    type ProcessEnv = EnvironmentVariables;
  }
}

export {};
