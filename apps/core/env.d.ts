export type EnvironmentVariables = {
  ENABLE_INTROSPECTION: string;
  HOST: string;
  PORT: string;
};

declare global {
  namespace NodeJS {
    interface ProcessEnv extends EnvironmentVariables {}
  }
}

export {};
