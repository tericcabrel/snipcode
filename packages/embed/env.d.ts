export type EnvironmentVariables = {
  DATABASE_URL: string;
  EMBED_JS_URL: string;
  EMBED_STYLE_URL: string;
  NODE_ENV: string;
  WEB_APP_URL: string;
  WEB_APP_SNIPPET_VIEW_URL: string;
};

declare global {
  namespace NodeJS {
    type ProcessEnv = EnvironmentVariables;
  }
}

export {};
