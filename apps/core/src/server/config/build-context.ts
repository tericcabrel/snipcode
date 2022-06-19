import {
  NewsletterService,
  folderService,
  roleService,
  sessionService,
  snippetService,
  userService,
} from '@sharingan/domain';
import { Request, Response } from 'express';

import { env } from '../../configs/env';
import { AppContext } from '../../types/common';

const getUserFromToken = async (req: Request): Promise<string | undefined> => {
  const token = req.headers['authorization'];

  if (!token) {
    return;
  }
  const session = await sessionService.findByToken(token);

  return session?.userId;
};

export const buildGraphQLContext = async (req: Request, res: Response): Promise<AppContext> => {
  const userId = await getUserFromToken(req);

  const newsletterService = new NewsletterService({
    apiKey: env.CONVERTKIT_API_KEY,
    formId: env.CONVERTKIT_FORM_ID,
  });

  return {
    db: {
      folder: folderService,
      newsletter: newsletterService,
      role: roleService,
      session: sessionService,
      snippet: snippetService,
      user: userService,
    },
    req: Object.assign(req, { session: { userId } }),
    res,
  };
};
