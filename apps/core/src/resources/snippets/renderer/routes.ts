import { Router } from 'express';

import { previewSnippet } from './handlers/preview';

const rendererRoute = (): Router => {
  const router = Router();

  router.get('/snippets/:id', previewSnippet);

  return router;
};

export { rendererRoute };
