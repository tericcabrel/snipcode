import { Router } from 'express';

import { generateOembed } from './handlers/generate-oembed';

const snippetRoute = (): Router => {
  const router = Router();

  router.get('/oembed/:id', generateOembed);

  return router;
};

export { snippetRoute };
