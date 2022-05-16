import { logger } from '../../../configs/logger';
import { MutationResolvers } from '../../../types/graphql';
import { NEWSLETTER_SUBSCRIBE_SUCCESS } from '../../../utils/constants';
import { throwApplicationError } from '../../../utils/errors/throw-error';

export const subscribeToNewsletter: MutationResolvers['subscribeToNewsletter'] = async (_parent, args, context) => {
  try {
    await context.db.newsletter.subscribe(args.email);

    return { message: NEWSLETTER_SUBSCRIBE_SUCCESS };
  } catch (err: any) {
    logger.error(err);

    return throwApplicationError(err);
  }
};
