import { createLogger, format, Logger, transports } from 'winston';
import { isObject } from 'lodash';
import * as Sentry from '@sentry/node';
import { LoggerInitOptions } from './types';

const { combine, printf, timestamp }: typeof format = format;

class BaseLogger {
  protected logger: Logger = createLogger();
  protected canLogToSentry = false;

  init(options: LoggerInitOptions): void {
    this.canLogToSentry = Boolean(options.logToSentry) && Boolean(options.sentryDsn);

    this.initSentryIfNecessary();

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

  private initSentryIfNecessary(sentryDsn?: string) {
    if (!this.canLogToSentry || !sentryDsn) {
      return;
    }

    Sentry.init({
      dsn: sentryDsn,
      // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
      // We recommend adjusting this value in production
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
