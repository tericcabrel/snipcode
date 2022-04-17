import { QueryResolvers } from '../../../types/graphql';

export const me: QueryResolvers['me'] = async (_parent, _args, context) => {
  const { userId } = context.req.session;

  if (!userId) {
    return null;
  }

  return context.db.user.findById(userId);
};
