import { logger } from '../../../configs/logger';
import { MutationResolvers } from '../../../types/graphql';
import { createUserSession } from '../../../utils/auth/session';
import { LOGIN_FAILED_MESSAGE } from '../../../utils/constants';
import AppError from '../../../utils/errors/app-error';

export const loginUser: MutationResolvers['loginUser'] = async (_parent, args, context) => {
  try {
    const { email, password } = args;
    const user = await context.db.user.login(email, password);

    const session = await createUserSession(user.id);

    return { token: session.token };
  } catch (err) {
    logger.error(err);

    throw new AppError(LOGIN_FAILED_MESSAGE, 'LOGIN_FAILED');
  }
};
