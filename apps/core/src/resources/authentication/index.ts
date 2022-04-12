import { Router } from 'express';
import { authGithub } from './auth-github';

const authenticationRoute = () => {
  const router = Router();

  router.get('/auth/github/callback', authGithub);

  return router;
};

export { authenticationRoute };
