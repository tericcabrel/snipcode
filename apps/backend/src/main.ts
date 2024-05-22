import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { EnvironmentVariables } from './types/common';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService<EnvironmentVariables, true>);
  const logger = new Logger('NestApplication');

  const port = configService.get<number>('PORT');
  const host = configService.get<string>('HOST');

  await app.listen(port, () => {
    logger.log(`Server ready at ${host}:${port}`);
    // logger.log(`Server ready at ${host}:${port}${graphqlServer.graphqlPath}`);
  });
};

void bootstrap();
