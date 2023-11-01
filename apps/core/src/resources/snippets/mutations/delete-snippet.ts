import { DeleteSnippetDto } from '@snipcode/domain';

import { getAuthenticatedUser } from '../../../configs/authentication';
import { logger } from '../../../configs/logger';
import { MutationResolvers } from '../../../types/graphql';
import { throwApplicationError } from '../../../utils/errors/throw-error';

export const deleteSnippet: MutationResolvers['deleteSnippet'] = async (_parent, { id }, context) => {
  const userId = getAuthenticatedUser(context);

  const deleteSnippetDto = new DeleteSnippetDto({
    creatorId: userId,
    snippetId: id,
  });

  try {
    await context.db.snippet.delete(deleteSnippetDto);

    return true;
  } catch (err: any) {
    logger.error(err);

    return throwApplicationError(err);
  }
};
