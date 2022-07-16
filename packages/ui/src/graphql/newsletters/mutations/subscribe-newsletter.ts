import { gql, useMutation } from '@apollo/client';

import { SubscribeNewsletterMutation, SubscribeNewsletterMutationVariables } from '../../generated';

const subscribeNewsletterMutation = gql`
  mutation subscribeNewsletter($email: String!) {
    subscribeToNewsletter(email: $email) {
      message
    }
  }
`;

const useSubscribeToNewsletterMutation = () => {
  return useMutation<SubscribeNewsletterMutation, SubscribeNewsletterMutationVariables>(subscribeNewsletterMutation);
};

export default useSubscribeToNewsletterMutation;
export { subscribeNewsletterMutation };
