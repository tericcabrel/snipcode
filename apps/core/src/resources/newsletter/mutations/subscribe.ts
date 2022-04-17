import { ApolloError } from 'apollo-server-express';
import { MutationResolvers } from '../../../types/graphql';
import { logger } from '../../../configs/logger';

export const subscribeToNewsletter: MutationResolvers['subscribeToNewsletter'] = async (_parent, args, context) => {
  try {
    await context.db.newsletter.subscribe(args.email);
  } catch (err) {
    logger.error(err);

    throw new ApolloError('NEWSLETTER_SUBSCRIBE_FAILED', 'Failed to subscribe to the newsletter.');
  }

  return { message: 'Subscribed to the newsletter successfully' };
};
