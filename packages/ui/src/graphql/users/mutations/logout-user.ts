import { gql, useMutation } from '@apollo/client';

import { LogoutUserMutation, LogoutUserMutationVariables } from '../../generated';

const mutationDocument = gql`
  mutation logoutUser {
    logoutUser
  }
`;

export const useLogoutUserMutation = () => {
  return useMutation<LogoutUserMutation, LogoutUserMutationVariables>(mutationDocument, {});
};
