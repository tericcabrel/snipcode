import { DynamicModule, Module } from '@nestjs/common';

import { MODULE_OPTIONS, NEWSLETTER_SERVICE_OPTIONS } from './constants';
import { FolderService } from './services/folders/folder.service';
import { NewsletterService } from './services/newsletters/newsletter.service';
import { PrismaService } from './services/prisma.service';
import { RoleService } from './services/roles/role.service';
import { SessionService } from './services/sessions/session.service';
import { SnippetService } from './services/snippets/snippet.service';
import { UserService } from './services/users/user.service';

export type ModuleOptions = {
  convertKit: {
    apiKey: string;
    formId: string;
  };
  databaseUrl: string;
};

type ModuleConfig = {
  imports?: any[];
  inject?: any[];
  isGlobal?: boolean;
  useFactory: (...args: any[]) => Promise<ModuleOptions> | ModuleOptions;
};

@Module({})
export class DomainModule {
  static forRootAsync(config: ModuleConfig): DynamicModule {
    return {
      exports: [
        PrismaService,
        UserService,
        RoleService,
        FolderService,
        SnippetService,
        SessionService,
        NewsletterService,
        NEWSLETTER_SERVICE_OPTIONS,
      ],
      global: config.isGlobal,
      imports: config.imports ? [...config.imports] : [],
      module: DomainModule,
      providers: [
        {
          inject: config.inject ? [...config.inject] : [],
          provide: MODULE_OPTIONS,
          useFactory: config.useFactory,
        },
        {
          inject: [MODULE_OPTIONS],
          provide: NEWSLETTER_SERVICE_OPTIONS,
          useFactory: (options: ModuleOptions) => ({
            apiKey: options.convertKit.apiKey,
            formId: options.convertKit.formId,
          }),
        },
        {
          inject: [MODULE_OPTIONS],
          provide: PrismaService,
          useFactory: (options: ModuleOptions) => {
            return new PrismaService({
              datasources: {
                db: {
                  url: options.databaseUrl,
                },
              },
              log: [],
            });
          },
        },
        UserService,
        RoleService,
        FolderService,
        SnippetService,
        SessionService,
        NewsletterService,
      ],
    };
  }
}
