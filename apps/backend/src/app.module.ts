import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DomainModule } from '@snipcode/domain';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import appConfig, { EnvironmentVariables, validate } from './configs/environment';

@Module({
  controllers: [AppController],
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.test'],
      isGlobal: true,
      load: [appConfig],
      validate,
    }),
    DomainModule.forRootAsync({
      inject: [ConfigService],
      isGlobal: true,
      useFactory: (configService: ConfigService<EnvironmentVariables, true>) => {
        return {
          convertKit: {
            apiKey: '',
            formId: '',
          },
          databaseUrl: configService.get('DATABASE_URL'),
        };
      },
    }),
  ],
  providers: [Logger, AppService],
})
export class AppModule {}
