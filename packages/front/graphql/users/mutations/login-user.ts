import { gql, useMutation } from '@apollo/client';

import { LoginUserMutation, LoginUserMutationVariables } from '../../generated';

const queryDocument = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      __typename
      token
    }
  }
`;

export const useLoginUserMutation = () => {
  return useMutation<LoginUserMutation, LoginUserMutationVariables>(queryDocument);
};
