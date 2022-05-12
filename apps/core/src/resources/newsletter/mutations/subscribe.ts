import { logger } from '../../../configs/logger';
import { MutationResolvers } from '../../../types/graphql';
import { NEWSLETTER_SUBSCRIBE_SUCCESS } from '../../../utils/constants';
import { throwApplicationError } from '../../../utils/errors/throw-error';

export const subscribeToNewsletter: MutationResolvers['subscribeToNewsletter'] = async (_parent, args, context) => {
  try {
    await context.db.newsletter.subscribe(args.email);
  } catch (err: any) {
    logger.error(err);

    throwApplicationError(err);
  }

  return { message: NEWSLETTER_SUBSCRIBE_SUCCESS };
};
