import { Session } from 'express-session';
import { Request, Response } from 'express';
import { Query, Send } from 'express-serve-static-core';
import { NewsletterService, RoleService, UserService } from '@sharingan/domain';
import { EnvironmentVariables } from '../../env';

export type AppEnvironmentVariables = Omit<
  EnvironmentVariables,
  'ENABLE_INTROSPECTION' | 'PORT' | 'REQUEST_TIMEOUT'
> & {
  ENABLE_INTROSPECTION: boolean;
  IS_DEV: boolean;
  IS_PROD: boolean;
  PORT: number;
  REQUEST_TIMEOUT: number;
};

export type AppContext = {
  db: {
    newsletter: NewsletterService;
    role: RoleService;
    user: UserService;
  };
  req: Request & { session: Session & { userId?: string } };
  res: Response;
};

declare module 'express-session' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface SessionData {
    userId: string;
  }
}

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export interface ExpressRequestBody<T> extends Express.Request {
  body: T;
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
