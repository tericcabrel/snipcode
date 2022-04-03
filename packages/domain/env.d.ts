export type EnvironmentVariables = {
  ADMIN_PASSWORD: string;
  PASSWORD_SALT: string;
};

declare global {
  namespace NodeJS {
    type ProcessEnv = EnvironmentVariables;
  }
}

export {};
