import { gql, useMutation } from '@apollo/client';

import { SubscribeNewsletterMutation, SubscribeNewsletterMutationVariables } from '@/graphql/generated';

const subscribeNewsletterMutation = gql`
  mutation subscribeNewsletter($email: String!) {
    subscribeToNewsletter(email: $email) {
      message
    }
  }
`;

const useSubscribeToNewsletter = () => {
  return useMutation<SubscribeNewsletterMutation, SubscribeNewsletterMutationVariables>(subscribeNewsletterMutation);
};

export default useSubscribeToNewsletter;
export { subscribeNewsletterMutation };
