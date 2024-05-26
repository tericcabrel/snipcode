import { Request } from 'express';

export type { EnvironmentVariables } from '../configs/environment';

export type GraphQLContext = {
  req: Request & { userId?: string };
};
