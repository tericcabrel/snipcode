export type EnvironmentVariables = {
  ADMIN_PASSWORD: string;
  APP_VERSION: string;
  CONVERTKIT_API_KEY: string;
  CONVERTKIT_FORM_ID: string;
  CONVERTKIT_TAG_ID: string;
  DATABASE_URL: string;
  GITHUB_CLIENT_ID: string;
  GITHUB_CLIENT_SECRET: string;
  HOST: string;
  INTROSPECTION_ENABLED: string;
  JWT_SECRET: string;
  NODE_ENV: string;
  PORT: string;
  REQUEST_TIMEOUT: string;
  SENTRY_DSN: string;
  SENTRY_ENABLED: string;
  SESSION_LIFETIME: string;
  SNIPPET_RENDERER_URL: string;
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
