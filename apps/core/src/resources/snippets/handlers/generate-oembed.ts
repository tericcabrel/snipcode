import { snippetService } from '@sharingan/domain';
import { generateOembedMetadata } from '@sharingan/embed';
import { Request, Response } from 'express';

import { env } from '../../../configs/env';
import { logger } from '../../../configs/logger';

export const generateOembed = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const snippet = await snippetService.findById(id);

    const embedMetadata = generateOembedMetadata({
      snippet: {
        id: snippet.id,
        name: snippet.name,
      },
      snippetRendererURL: env.SNIPPET_RENDERER_URL,
      webAppURL: env.WEB_APP_URL,
    });

    return res.json(embedMetadata);
  } catch (e) {
    logger.error(e);

    return res.status(404).json({ error: 'Not found' });
  }
};
