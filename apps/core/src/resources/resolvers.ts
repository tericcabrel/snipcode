import { Resolvers } from '../types/graphql';
import { dateScalar } from './types/date';
import { subscribeToNewsletter } from './newsletter/mutations/subscribe';
import { logoutUser } from './users/mutations/logout-user';
import { authenticatedUser } from './users/queries/authenticated-user';

export const resolvers: Resolvers = {
  Date: dateScalar,
  Mutation: {
    logoutUser,
    subscribeToNewsletter,
  },
  Query: {
    authenticatedUser,
  },
  User: {
    role: (user, _args, context) => {
      return context.db.role.findById(user.roleId);
    },
  },
};
