import { ApolloError } from 'apollo-server-express';

import { logger } from '../../../configs/logger';
import { MutationResolvers } from '../../../types/graphql';
import { NEWSLETTER_SUBSCRIBE_SUCCESS } from '../../../utils/constants';
import { NEWSLETTER_SUBSCRIBE_FAILED_CODE, NEWSLETTER_SUBSCRIBE_FAILED_MESSAGE } from '../../../utils/errors';

export const subscribeToNewsletter: MutationResolvers['subscribeToNewsletter'] = async (_parent, args, context) => {
  try {
    await context.db.newsletter.subscribe(args.email);
  } catch (err) {
    logger.error(err);

    throw new ApolloError(NEWSLETTER_SUBSCRIBE_FAILED_CODE, NEWSLETTER_SUBSCRIBE_FAILED_MESSAGE);
  }

  return { message: NEWSLETTER_SUBSCRIBE_SUCCESS };
};
