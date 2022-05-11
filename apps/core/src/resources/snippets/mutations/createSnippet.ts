import { CreateSnippetDto } from '@sharingan/domain';
import { ApolloError } from 'apollo-server-core';

import { getAuthenticatedUser } from '../../../configs/authentication';
import { MutationResolvers } from '../../../types/graphql';
import { SNIPPET_ALREADY_EXIST_CODE, SNIPPET_ALREADY_EXIST_MESSAGE } from '../../../utils/errors';

export const createSnippet: MutationResolvers['createSnippet'] = async (_parent, { input }, context) => {
  const userId = getAuthenticatedUser(context);

  const isSnippetExist = await context.db.snippet.isSnippetExistInFolder(input.folderId, input.name);

  if (isSnippetExist) {
    throw new ApolloError(SNIPPET_ALREADY_EXIST_MESSAGE(input.name), SNIPPET_ALREADY_EXIST_CODE);
  }

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
