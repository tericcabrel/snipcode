import { gql, useMutation } from '@apollo/client';

import { SubscribeNewsletterMutation, SubscribeNewsletterMutationVariables } from '@/graphql/generated';

const mutationDocument = gql`
  mutation subscribeNewsletter($email: String!) {
    subscribeToNewsletter(email: $email) {
      message
    }
  }
`;

const useSubscribeToNewsletter = () => {
  return useMutation<SubscribeNewsletterMutation, SubscribeNewsletterMutationVariables>(mutationDocument);
};

export default useSubscribeToNewsletter;
