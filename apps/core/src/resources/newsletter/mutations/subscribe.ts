import { MutationResolvers } from '../../../types/graphql';

export const subscribeToNewsletter: MutationResolvers['subscribeToNewsletter'] = (_parent, args) => {
  console.log(args.email);

  return { message: 'Subscribed to the newsletter successfully' };
};
