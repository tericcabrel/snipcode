import { gql, useMutation } from '@apollo/client';

import { SubscribeNewsletterMutation, SubscribeNewsletterMutationVariables } from '../../generated';

export const subscribeNewsletterMutation = gql`
  mutation subscribeNewsletter($email: String!) {
    subscribeToNewsletter(email: $email) {
      message
    }
  }
`;

export const useSubscribeToNewsletterMutation = () => {
  return useMutation<SubscribeNewsletterMutation, SubscribeNewsletterMutationVariables>(subscribeNewsletterMutation);
};
