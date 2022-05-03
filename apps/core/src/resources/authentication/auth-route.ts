import { Router } from 'express';
import { authenticateWithGitHub } from './handlers/auth-github';

const authenticationRoute = () => {
  const router = Router();

  router.get('/auth/github/callback', authenticateWithGitHub);

  return router;
};

export { authenticationRoute };
