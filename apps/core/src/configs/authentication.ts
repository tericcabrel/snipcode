import { errors } from '@snipcode/utils';

import { AppContext } from '../types/common';
import AppError from '../utils/errors/app-error';

export const getAuthenticatedUser = (context: AppContext): string => {
  const { userId } = context.req.session;

  if (!userId) {
    throw new AppError(errors.NOT_AUTHENTICATED, 'NOT_AUTHENTICATED');
  }

  return userId;
};
