import { CreateSnippetDto } from '@sharingan/domain';

import { getAuthenticatedUser } from '../../../configs/authentication';
import { MutationResolvers } from '../../../types/graphql';

export const createSnippet: MutationResolvers['createSnippet'] = async (_parent, { input }, context) => {
  const userId = getAuthenticatedUser(context);

  // TODO check if the name already exists in the target folder

  const createSnippetDto = new CreateSnippetDto({
    content: input.content,
    description: input.description ?? null,
    folderId: input.folderId,
    language: input.language,
    name: input.name,
    userId,
    visibility: input.visibility,
  });

  return context.db.snippet.create(createSnippetDto);
};
