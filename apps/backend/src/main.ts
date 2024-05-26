import './configs/instrument';

import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import * as Sentry from '@sentry/node';

import { AppModule } from './app.module';
import { ApplicationExceptionFilter } from './configs/exception.filter';
import { EnvironmentVariables } from './types/common';
import { CORS_APOLLO_STUDIO_URL } from './utils/constants';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);

  const { httpAdapter } = app.get(HttpAdapterHost);

  Sentry.setupNestErrorHandler(app, new ApplicationExceptionFilter(httpAdapter));

  const configService = app.get(ConfigService<EnvironmentVariables, true>);

  app.enableCors({
    credentials: true,
    origin: [configService.get('WEB_APP_URL'), CORS_APOLLO_STUDIO_URL],
  });

  app.enableShutdownHooks();

  const logger = new Logger('NestApplication');

  const port = configService.get<number>('PORT');
  const host = configService.get<string>('HOST');

  await app.listen(port, () => {
    logger.log(`Application ready at ${host}:${port}/graphql`);
  });
};

void bootstrap();
