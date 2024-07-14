export type EnvironmentVariables = {
  APP_ENV: string;
  NEXT_PUBLIC_APP_URL: string;
  NEXT_PUBLIC_GITHUB_CLIENT_ID: string;
  NEXT_PUBLIC_SENTRY_DSN: string;
  NEXT_PUBLIC_SENTRY_ENABLED: string;
  NEXT_PUBLIC_SERVER_URL: string;
};

declare global {
  namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    interface ProcessEnv extends EnvironmentVariables {}
  }
}

export {};
