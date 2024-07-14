import { ApolloServerPlugin } from '@apollo/server';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { DomainModule } from '@snipcode/domain';

import { EnvironmentVariables, validate } from './configs/environment';
import { AppController } from './features/app/app.controller';
import { AppService } from './features/app/app.service';
import { AuthFeatureModule } from './features/auth/auth.module';
import { FolderFeatureModule } from './features/folders/folder.module';
import { SnippetFeatureModule } from './features/snippets/snippet.module';
import { UserFeatureModule } from './features/users/user.module';
import { IS_DEV } from './utils/environment';
import { DateScalar } from './utils/graphql/date-scalar';

const explorerPlugin: ApolloServerPlugin[] = IS_DEV ? [ApolloServerPluginLandingPageLocalDefault({ embed: true })] : [];

@Module({
  controllers: [AppController],
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env.test'],
      isGlobal: true,
      validate,
    }),
    DomainModule.forRootAsync({
      inject: [ConfigService],
      isGlobal: true,
      useFactory: (configService: ConfigService<EnvironmentVariables, true>) => {
        return {
          convertKit: {
            apiKey: configService.get('CONVERTKIT_API_KEY'),
            formId: configService.get('CONVERTKIT_FORM_ID'),
          },
          databaseUrl: configService.get('DATABASE_URL'),
        };
      },
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      inject: [ConfigService],
      useFactory: (configService: ConfigService<EnvironmentVariables, true>) => {
        return {
          cache: 'bounded',
          includeStacktraceInErrorResponses: IS_DEV,
          introspection: configService.get('INTROSPECTION_ENABLED'),
          nodeEnv: configService.get('NODE_ENV'),
          playground: false,
          plugins: [...explorerPlugin],
          typePaths: ['./**/*.graphql'],
        };
      },
    }),
    AuthFeatureModule,
    FolderFeatureModule,
    SnippetFeatureModule,
    UserFeatureModule,
  ],
  providers: [Logger, DateScalar, AppService],
})
export class AppModule {}
