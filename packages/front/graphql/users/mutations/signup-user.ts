import { gql, useMutation } from '@apollo/client';

import { SignupUserMutation, SignupUserMutationVariables } from '../../generated';

const queryDocument = gql`
  mutation signupUser($input: SignupUserInput!) {
    signupUser(input: $input) {
      message
    }
  }
`;

export const useSignupUserMutation = () => {
  return useMutation<SignupUserMutation, SignupUserMutationVariables>(queryDocument);
};
