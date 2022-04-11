import { Request, Response } from 'express';

export const authGithub = async (_req: Request, res: Response) => {
  console.log('Request');

  return res.json({ message: 'Auth from GitHub.' });
};
