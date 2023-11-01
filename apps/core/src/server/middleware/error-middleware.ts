import { errors } from '@snipcode/utils';
import { NextFunction, Request, Response } from 'express';

import { logger } from '../../configs/logger';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandlerMiddleware = (error: unknown, _req: Request, res: Response, _next: NextFunction) => {
  logger.error(error);

  return res.status(500).json({ message: errors.INTERNAL_SERVER_ERROR });
};
