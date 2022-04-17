import { QueryResolvers } from '../../../types/graphql';

export const authenticatedUser: QueryResolvers['authenticatedUser'] = async (_parent, _args, context) => {
  const { userId } = context.req.session;

  if (!userId) {
    return null;
  }

  return context.db.user.findById(userId);
};
