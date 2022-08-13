import { QueryResolvers } from '../../../types/graphql';
import { AUTH_USER_NOT_FOUND, AUTH_USER_NOT_FOUND_CODE } from '../../../utils/constants';
import AppError from '../../../utils/errors/app-error';

export const authenticatedUser: QueryResolvers['authenticatedUser'] = async (_parent, _args, context) => {
  const { userId } = context.req.session;

  if (!userId) {
    throw new AppError(AUTH_USER_NOT_FOUND, AUTH_USER_NOT_FOUND_CODE);
  }

  const user = await context.db.user.findById(userId);

  if (!user) {
    throw new AppError(AUTH_USER_NOT_FOUND, AUTH_USER_NOT_FOUND_CODE);
  }

  return user;
};
