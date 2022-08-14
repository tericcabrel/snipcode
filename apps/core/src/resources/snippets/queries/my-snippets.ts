import { getAuthenticatedUser } from '../../../configs/authentication';
import { QueryResolvers } from '../../../types/graphql';

export const mySnippets: QueryResolvers['mySnippets'] = (_parent, _args, context) => {
  const userId = getAuthenticatedUser(context);

  return context.db.snippet.findByUser(userId);
};
