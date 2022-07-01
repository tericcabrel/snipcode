import { gql, useMutation } from '@apollo/client';

import { SignupUserMutation, SignupUserMutationVariables } from '@/graphql/generated';

const queryDocument = gql`
  mutation signupUser($input: SignupUserInput!) {
    signupUser(input: $input) {
      message
    }
  }
`;

const useSignupUserMutation = () => {
  return useMutation<SignupUserMutation, SignupUserMutationVariables>(queryDocument);
};

export default useSignupUserMutation;
