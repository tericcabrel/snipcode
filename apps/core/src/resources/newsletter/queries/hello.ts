import { QueryResolvers } from '../../../types/graphql';

export const hello: QueryResolvers['hello'] = (_parent, _args) => {
  return 'Hello world!';
};
