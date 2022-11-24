import { QueryResolvers } from '../../../types/graphql';

export const publicSnippets: QueryResolvers['publicSnippets'] = async (_parent, args, context) => {
  const {
    input: { itemPerPage, keyword, nextToken, sortMethod },
  } = args;

  const result = await context.db.snippet.findPublicSnippet({
    cursor: nextToken,
    itemPerPage: itemPerPage ?? 10,
    keyword: keyword ?? undefined,
    sortMethod: sortMethod ?? 'recently_created',
  });

  return {
    hasMore: result.hasMore,
    itemPerPage,
    items: result.items,
    nextToken: result.nextCursor,
  };
};
