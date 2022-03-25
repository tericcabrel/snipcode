import { EnvironmentVariables } from '../../env';

export type AppEnvironmentVariables = Omit<EnvironmentVariables, 'ENABLE_INTROSPECTION' | 'PORT'> & {
  ENABLE_INTROSPECTION: boolean;
  IS_DEV: boolean;
  IS_PROD: boolean;
  PORT: number;
};
