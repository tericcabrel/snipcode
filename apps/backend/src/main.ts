import './configs/instrument';

import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { setupAppServer } from './server';
import { EnvironmentVariables } from './types/common';

const bootstrap = async () => {
  const logger = new Logger('NestApplication');

  const app = await setupAppServer({ logger });

  const configService = app.get(ConfigService<EnvironmentVariables, true>);

  const port = configService.get<number>('PORT');
  const host = configService.get<string>('HOST');

  await app.listen(port, () => {
    logger.log(`Application ready at ${host}:${port}/graphql`);
  });
};

void bootstrap();
