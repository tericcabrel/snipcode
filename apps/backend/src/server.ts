import { INestApplication, LoggerService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import * as Sentry from '@sentry/node';

import { AppModule } from './app.module';
import { EnvironmentVariables } from './configs/environment';
import { ApplicationExceptionFilter } from './configs/exception.filter';
import { CORS_APOLLO_STUDIO_URL } from './utils/constants';

export const setupAppServer = async ({
  logger: loggerService,
}: {
  logger?: LoggerService | false;
}): Promise<INestApplication> => {
  const app = await NestFactory.create(AppModule, { logger: loggerService });

  const { httpAdapter } = app.get(HttpAdapterHost);

  Sentry.setupNestErrorHandler(app, new ApplicationExceptionFilter(httpAdapter));

  const configService = app.get(ConfigService<EnvironmentVariables, true>);

  app.enableCors({
    credentials: true,
    origin: [configService.get('WEB_APP_URL'), CORS_APOLLO_STUDIO_URL],
  });

  app.enableShutdownHooks();

  return app;
};
