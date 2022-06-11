import {
  FolderService,
  NewsletterService,
  RoleService,
  SessionService,
  SnippetService,
  UserService,
} from '@sharingan/domain';
import { Request, Response } from 'express';
import { Query, Send } from 'express-serve-static-core';

import { EnvironmentVariables } from '../../env';

export type AppEnvironmentVariables = Omit<
  EnvironmentVariables,
  'ENABLE_INTROSPECTION' | 'PORT' | 'REQUEST_TIMEOUT' | 'SESSION_LIFETIME'
> & {
  ENABLE_INTROSPECTION: boolean;
  IS_DEV: boolean;
  IS_PROD: boolean;
  PORT: number;
  REQUEST_TIMEOUT: number;
  SESSION_LIFETIME: number;
};

export type AppContext = {
  db: {
    folder: FolderService;
    newsletter: NewsletterService;
    role: RoleService;
    session: SessionService;
    snippet: SnippetService;
    user: UserService;
  };
  req: Request & { session: { userId?: string } };
  res: Response;
};

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export interface ExpressRequestBody<T> extends Express.Request {
  body: T;
}

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export interface ExpressRequestParams<T extends { id: string }> extends Express.Request {
  params: T;
}

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export interface ExpressRequestQuery<T extends Query> extends Express.Request {
  query: T;
}

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export interface ExpressRequest<T extends Query, U> extends Express.Request {
  body: U;
  query: T;
}

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export interface ExpressResponse<ResBody> extends Express.Response {
  json: Send<ResBody, this>;
}
