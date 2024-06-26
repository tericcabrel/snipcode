import * as Sentry from '@sentry/node';

import { IS_DEV, IS_PROD } from '../utils/environment';

const isSentryEnabled = () => {
  if (process.env.SENTRY_ENABLED !== 'true') {
    return false;
  }

  return IS_PROD || IS_DEV;
};

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  enabled: isSentryEnabled(),
  environment: process.env.NODE_ENV,
  integrations: [Sentry.prismaIntegration()],
  // https://docs.sentry.io/platforms/javascript/guides/nestjs/configuration/sampling/#setting-a-uniform-sample-rate
  tracesSampleRate: 0.6,
});

Sentry.setContext('app', {
  version: process.env.APP_VERSION,
});
