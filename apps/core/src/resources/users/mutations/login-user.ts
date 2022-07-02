import { logger } from '../../../configs/logger';
import { MutationResolvers } from '../../../types/graphql';
import { createUserSession } from '../../../utils/auth/session';
import { throwApplicationError } from '../../../utils/errors/throw-error';

export const loginUser: MutationResolvers['loginUser'] = async (_parent, args, context) => {
  try {
    const { email, password } = args;
    const user = await context.db.user.login(email, password);

    const session = await createUserSession(user.id);

    return { token: session.token };
  } catch (err) {
    logger.error(err);

    return throwApplicationError(err);
  }
};
