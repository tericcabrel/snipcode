import * as Sentry from '@sentry/node';
import { isObject } from 'lodash';
import { Logger, createLogger, format, transports } from 'winston';

import { LoggerInitOptions } from './types';

const { combine, printf, timestamp }: typeof format = format;

class BaseLogger {
  protected logger: Logger = createLogger();
  protected canLogToSentry = false;

  init(options: LoggerInitOptions): void {
    this.canLogToSentry = options.sentry.enabled;

    this.initSentryIfNecessary(options.sentry.dsn, options.sentry.environment);

    this.logger = createLogger({
      format: combine(timestamp(), this.customFormat()),
      silent: Boolean(options.silent),
      transports: [new transports.Console()],
    });
  }

  error(error: unknown): void {
    this.logger.error(this.logMessage(error));

    if (this.canLogToSentry) {
      this.logErrorToSentry(error);
    }
  }

  info(output: unknown): void {
    this.logger.info(this.logMessage(output));
  }

  private initSentryIfNecessary(sentryDsn?: string, environment?: string) {
    if (!this.canLogToSentry || !sentryDsn) {
      return;
    }

    Sentry.init({
      dsn: sentryDsn,
      environment,
      tracesSampleRate: 1.0,
    });
  }

  private logErrorToSentry(e: any) {
    Sentry.captureException(e);
  }

  private logMessage(message: any): string {
    if (isObject(message)) {
      // @ts-expect-error Property 'stack' does not exist on type 'object'.
      return 'stack' in message ? message.stack : JSON.stringify(message, undefined, 2);
    }

    return message.toString();
  }

  private customFormat() {
    return printf((info) => {
      const { level, message, timestamp } = info;

      return `${timestamp} ${level}: ${this.logMessage(message)}`;
    });
  }
}

export default BaseLogger;
