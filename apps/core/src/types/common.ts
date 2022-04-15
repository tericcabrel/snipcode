import { Session } from 'express-session';
import { Request, Response } from 'express';
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
  req: Request & { session: Session & { userId?: string } };
  res: Response;
};
