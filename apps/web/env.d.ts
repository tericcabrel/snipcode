export type EnvironmentVariables = {
  APP_ENV: string;
  NEXT_PUBLIC_APP_URL: string;
  NEXT_PUBLIC_GITHUB_CLIENT_ID: string;
  NEXT_PUBLIC_SERVER_URL: string;
};

declare global {
  namespace NodeJS {
    type ProcessEnv = EnvironmentVariables;
  }
}

export {};
