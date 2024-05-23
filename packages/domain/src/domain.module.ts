import { DynamicModule, Module, Provider } from '@nestjs/common';

import { DOMAIN_SERVICES_OPTIONS } from './constants';
import { PrismaService } from './prisma.service';
import { FolderService } from './services/folders/folder.service';
import { NewsletterService } from './services/newsletters/newsletter.service';
import { RoleService } from './services/roles/role.service';
import { SessionService } from './services/sessions/session.service';
import { SnippetService } from './services/snippets/snippet.service';
import { UserService } from './services/users/user.service';

type DomainModuleServicesOptions = {
  convertKit: {
    apiKey: string;
    formId: string;
  };
  databaseUrl: string;
};

type DomainModuleConfig = {
  inject?: any[];
  isGlobal?: boolean;
  useFactory?: (...args: any[]) => Promise<DomainModuleServicesOptions> | DomainModuleServicesOptions;
} & Partial<DomainModuleServicesOptions>;

@Module({
  exports: [PrismaService, UserService, RoleService, FolderService, SnippetService, SessionService, NewsletterService],
  providers: [
    PrismaService,
    UserService,
    RoleService,
    FolderService,
    SnippetService,
    SessionService,
    NewsletterService,
  ],
})
export class DomainModule {
  static forRootAsync(config: DomainModuleConfig = { isGlobal: false }): DynamicModule {
    const asyncProviders = this.createAsyncProviders(config);

    const prismaService = {
      inject: [DOMAIN_SERVICES_OPTIONS],
      provide: PrismaService,
      useFactory: (options: DomainModuleServicesOptions) => {
        return new PrismaService({
          datasources: {
            db: {
              url: options.databaseUrl,
            },
          },
          log: [],
        });
      },
    };

    const newsletterService = {
      inject: [DOMAIN_SERVICES_OPTIONS],
      provide: NewsletterService,
      useFactory: (domainConfig: DomainModuleConfig) => {
        const { convertKit } = domainConfig;

        if (!convertKit) {
          // throw new Error('Parameters are required: apiKey and formId');
          return null;
        }

        return new NewsletterService({
          apiKey: convertKit.apiKey,
          formId: convertKit.formId,
        });
      },
    };

    return {
      exports: [...asyncProviders, PrismaService, NewsletterService],
      global: config.isGlobal,
      module: DomainModule,
      providers: [...asyncProviders, prismaService, newsletterService],
    };
  }

  private static createAsyncProviders(config: DomainModuleConfig): Provider[] {
    if (config.useFactory) {
      return [
        {
          inject: config.inject ?? [],
          provide: DOMAIN_SERVICES_OPTIONS,
          useFactory: config.useFactory,
        },
      ];
    }

    if (config.databaseUrl ?? config.convertKit) {
      return [
        {
          provide: DOMAIN_SERVICES_OPTIONS,
          useValue: config,
        },
      ];
    }

    return [];
  }
}
