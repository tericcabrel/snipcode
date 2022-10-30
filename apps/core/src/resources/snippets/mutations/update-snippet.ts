import { UpdateSnippetDto } from '@sharingan/domain';

import { getAuthenticatedUser } from '../../../configs/authentication';
import { logger } from '../../../configs/logger';
import { MutationResolvers } from '../../../types/graphql';
import { throwApplicationError } from '../../../utils/errors/throw-error';

export const updateSnippet: MutationResolvers['updateSnippet'] = async (_parent, { id, input }, context) => {
  const userId = getAuthenticatedUser(context);

  const updateSnippetDto = new UpdateSnippetDto({
    content: input.content,
    contentHighlighted: input.contentHighlighted,
    creatorId: userId,
    description: input.description ?? null,
    language: input.language,
    lineHighlight: input.lineHighlight ?? null,
    name: input.name,
    snippetId: id,
    theme: input.theme,
    visibility: input.visibility,
  });

  try {
    return context.db.snippet.update(updateSnippetDto);
  } catch (err: any) {
    logger.error(err);

    return throwApplicationError(err);
  }
};
