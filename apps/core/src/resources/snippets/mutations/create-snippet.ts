import { CreateSnippetDto } from '@snipcode/domain';

import { getAuthenticatedUser } from '../../../configs/authentication';
import { logger } from '../../../configs/logger';
import { MutationResolvers } from '../../../types/graphql';
import { throwApplicationError } from '../../../utils/errors/throw-error';

export const createSnippet: MutationResolvers['createSnippet'] = async (_parent, { input }, context) => {
  const userId = getAuthenticatedUser(context);

  const createSnippetDto = new CreateSnippetDto({
    content: input.content,
    contentHighlighted: input.contentHighlighted,
    description: input.description ?? null,
    folderId: input.folderId,
    language: input.language,
    lineHighlight: input.lineHighlight ?? null,
    name: input.name,
    theme: input.theme,
    userId,
    visibility: input.visibility,
  });

  try {
    return context.db.snippet.create(createSnippetDto);
  } catch (err: any) {
    logger.error(err);

    return throwApplicationError(err);
  }
};
