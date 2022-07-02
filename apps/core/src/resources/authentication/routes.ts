import { Router } from 'express';

import { authenticateWithGitHub } from './handlers/github';

const authenticationRoute = (): Router => {
  const router = Router();

  router.get('/auth/github/callback', authenticateWithGitHub);

  return router;
};

export { authenticationRoute };
