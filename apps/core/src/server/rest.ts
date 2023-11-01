import express, { Application, Request, Response } from 'express';

import { authenticationRoute } from '../resources/authentication/routes';
import { snippetRoute } from '../resources/snippets/routes';
import { errorHandlerMiddleware } from './middleware/error-middleware';
import { notFoundMiddleware } from './middleware/not-found-middleware';

export const setupRestEndpoints = (app: Application) => {
  const router = express.Router();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // Allow express to handle cookie and session on a reverse proxy
  app.set('trust proxy', true);

  app.use('/', router);
  app.use('/', authenticationRoute());
  app.use('/', snippetRoute());

  app.get('/', (_req: Request, res: Response) => {
    res.json({ message: 'Hello from Snipcode!' });
  });

  app.use(notFoundMiddleware);

  app.use(errorHandlerMiddleware);
};
