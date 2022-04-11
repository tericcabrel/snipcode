import { Request, Response } from 'express';
import { PATH_NOT_FOUND } from '../../utils/constants';

export const notFoundMiddleware = (_req: Request, res: Response) => {
  return res.status(404).json({ message: PATH_NOT_FOUND });
};
