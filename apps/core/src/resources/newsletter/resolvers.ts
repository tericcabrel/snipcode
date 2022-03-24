import { Resolvers } from '../../types/graphql';
import { subscribeToNewsletter } from './mutations/subscribe';
import { hello } from './queries/hello';

export const resolvers: Resolvers = {
  Mutation: {
    subscribeToNewsletter,
  },
  Query: {
    hello,
  },
};
