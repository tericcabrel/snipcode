import path from 'path';

import { fileLogger } from '@snipcode/logger';

import { env } from './env';

fileLogger.init({
  appName: 'core',
  logFileDirectory: path.resolve(__dirname, '../../logs'),
  sentry: {
    dsn: env.SENTRY_DSN,
    enabled: Boolean(env.SENTRY_DSN) && env.SENTRY_ENABLED,
    environment: env.VALUE,
  },
});

export { fileLogger as logger };
