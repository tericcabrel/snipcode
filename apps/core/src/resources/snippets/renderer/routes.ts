import { Router } from 'express';

import { previewSnippet } from './handlers/preview';

const rendererRoute = (): Router => {
  const router = Router();

  router.get('/snippet/:id', previewSnippet);

  return router;
};

export { rendererRoute };
