export type EnvironmentVariables = {
  HOST: string;
  PORT: string;
};

declare global {
  namespace NodeJS {
    interface ProcessEnv extends EnvironmentVariables {}
  }
}

export {};
