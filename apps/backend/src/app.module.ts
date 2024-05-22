import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import appConfig, { validate } from './configs/environment';

@Module({
  controllers: [AppController],
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.test'],
      isGlobal: true,
      load: [appConfig],
      validate,
    }),
  ],
  providers: [AppService],
})
export class AppModule {}
