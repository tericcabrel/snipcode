import { QueryResolvers } from '../../../types/graphql';

export const publicSnippets: QueryResolvers['publicSnippets'] = async (_parent, input, context) => {
  const {
    args: { itemPerPage, nextToken },
  } = input;

  const result = await context.db.snippet.findPublicSnippet({
    cursor: nextToken,
    itemPerPage: itemPerPage ?? 10,
  });

  return {
    hasMore: result.hasMore,
    itemPerPage,
    items: result.items,
    nextToken: result.nextCursor,
  };
};
