import { Resolvers } from '../types/graphql';
import { dateScalar } from './types/date';
import { subscribeToNewsletter } from './newsletter/mutations/subscribe';
import { me } from './users/queries/me';
import { logoutUser } from './users/mutations/logout-user';

export const resolvers: Resolvers = {
  Date: dateScalar,
  Mutation: {
    logoutUser,
    subscribeToNewsletter,
  },
  Query: {
    me,
  },
  User: {
    role: (user, _args, context) => {
      return context.db.role.findById(user.roleId);
    },
  },
};
