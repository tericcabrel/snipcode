import { QueryResolvers } from '../../../types/graphql';

export const allSnippets: QueryResolvers['allSnippets'] = (_parent, _args, context) => {
  return context.db.snippet.findPublicSnippet();
};
