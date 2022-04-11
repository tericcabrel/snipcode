import express, { Application } from 'express';
import cors from 'cors';
import { authenticationRoute } from '../resources/authentication';
import { notFoundMiddleware } from './middleware/not-found-middleware';
import { errorHandlerMiddleware } from './middleware/error-middleware';

export const setupRestEndpoints = (app: Application) => {
  const router = express.Router();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cors());

  app.set('trust proxy', true);

  app.use('/', router);
  app.use('/', authenticationRoute());

  app.use(notFoundMiddleware);

  app.use(errorHandlerMiddleware);
};
