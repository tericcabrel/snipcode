import * as Sentry from '@sentry/nextjs';

export const logErrorToSentry = (error: unknown, extra: Record<string, any> = {}) => {
  if (process.env.NEXT_PUBLIC_SENTRY_ENABLED === 'true') {
    Sentry.captureException(error, { extra });
  }
};
