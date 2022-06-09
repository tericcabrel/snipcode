import { getAuthenticatedUser } from '../../../configs/authentication';
import { MutationResolvers } from '../../../types/graphql';

export const logoutUser: MutationResolvers['logoutUser'] = async (_parent, _args, context) => {
  const userId = getAuthenticatedUser(context);

  await context.db.session.deleteUserSessions(userId);

  return true;
};
