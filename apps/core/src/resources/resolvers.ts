import { Resolvers } from '../types/graphql';
import { dateScalar } from './types/date';
import { subscribeToNewsletter } from './newsletter/mutations/subscribe';
import { me } from './users/queries/me';

export const resolvers: Resolvers = {
  Date: dateScalar,
  Mutation: {
    subscribeToNewsletter,
  },
  Query: {
    me,
  },
};
