import { getEnv } from '@sharingan/utils';
import dotenv from 'dotenv';

import { AppEnvironmentVariables } from '../types/common';

dotenv.config({ override: true });

export const env: AppEnvironmentVariables = {
  ADMIN_PASSWORD: getEnv('ADMIN_PASSWORD'),
  CONVERTKIT_API_KEY: getEnv('CONVERTKIT_API_KEY'),
  CONVERTKIT_FORM_ID: getEnv('CONVERTKIT_FORM_ID'),
  CONVERTKIT_TAG_ID: getEnv('CONVERTKIT_TAG_ID'),
  DATABASE_URL: getEnv('DATABASE_URL'),
  ENABLE_INTROSPECTION: getEnv('ENABLE_INTROSPECTION') === 'true',
  GITHUB_CLIENT_ID: getEnv('GITHUB_CLIENT_ID'),
  GITHUB_CLIENT_SECRET: getEnv('GITHUB_CLIENT_SECRET'),
  HOST: getEnv('HOST'),
  IS_DEV: getEnv('NODE_ENV') !== 'production',
  IS_PROD: getEnv('NODE_ENV') === 'production',
  PORT: parseInt(getEnv('PORT'), 10),
  REQUEST_TIMEOUT: parseInt(getEnv('REQUEST_TIMEOUT'), 10),
  SENTRY_DSN: getEnv('SENTRY_DSN'),
  SENTRY_ENABLED: getEnv('SENTRY_ENABLED') === 'true',
  SESSION_LIFETIME: parseInt(getEnv('SESSION_LIFETIME'), 10),
  VALUE: getEnv('NODE_ENV'),
  WEB_APP_URL: getEnv('WEB_APP_URL'),
  WEB_AUTH_ERROR_URL: getEnv('WEB_AUTH_ERROR_URL'),
  WEB_AUTH_SUCCESS_URL: getEnv('WEB_AUTH_SUCCESS_URL'),
};
