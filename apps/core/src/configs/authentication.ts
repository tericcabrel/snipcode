import { errors } from '@sharingan/utils';

import { AppContext } from '../types/common';
import AppError from '../utils/errors/app-error';
import { env } from './env';

export const getAuthenticatedUser = (context: AppContext): string => {
  // TODO waiting for a refactoring of the authentication system
  if (env.IS_DEV) {
    return 'cl23rzwe5000002czaedc8sll';
  }
  const { userId } = context.req.session;

  if (!userId) {
    throw new AppError(errors.NOT_AUTHENTICATED, 'NOT_AUTHENTICATED');
  }

  return userId;
};
