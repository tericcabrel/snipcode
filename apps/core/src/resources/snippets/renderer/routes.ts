import { Router } from 'express';

import { previewSnippet } from './handlers/preview';

const rendererRoute = () => {
  const router = Router();

  router.get('/snippet/:id', previewSnippet);

  return router;
};

export { rendererRoute };
