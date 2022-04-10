import dotenv from 'dotenv';
import { getEnv } from '@sharingan/utils';
import { AppEnvironmentVariables } from '../types/common';

dotenv.config();

export const env: AppEnvironmentVariables = {
  ADMIN_PASSWORD: getEnv('ADMIN_PASSWORD'),
  CONVERTKIT_API_KEY: getEnv('CONVERTKIT_API_KEY'),
  CONVERTKIT_FORM_ID: getEnv('CONVERTKIT_FORM_ID'),
  DATABASE_URL: getEnv('DATABASE_URL'),
  ENABLE_INTROSPECTION: getEnv('ENABLE_INTROSPECTION') === 'true',
  HOST: getEnv('HOST'),
  IS_DEV: getEnv('NODE_ENV') !== 'production',
  IS_PROD: getEnv('NODE_ENV') === 'production',
  PORT: parseInt(getEnv('PORT') ?? '7501', 10),
};
