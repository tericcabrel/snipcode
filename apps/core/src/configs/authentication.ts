import { ApolloError } from 'apollo-server-express';
import { AppContext } from '../types/common';
import { NOT_AUTHENTICATED_CODE, NOT_AUTHENTICATED_MESSAGE } from '../utils/errors';
import { env } from './env';

export const getAuthenticatedUser = (context: AppContext): string => {
  // TODO waiting for a refactoring of the authentication system
  if (env.IS_DEV) {
    return 'cl23rzwe5000002czaedc8sll';
  }
  const { userId } = context.req.session;

  if (!userId) {
    throw new ApolloError(NOT_AUTHENTICATED_MESSAGE, NOT_AUTHENTICATED_CODE);
  }

  return userId;
};
