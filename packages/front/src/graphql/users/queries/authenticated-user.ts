import { gql, useQuery } from '@apollo/client';

import { AuthenticatedUserQuery, AuthenticatedUserQueryVariables } from '../../generated';

export const queryDocument = gql`
  query authenticatedUser {
    authenticatedUser {
      __typename
      id
      email
      isEnabled
      name
      pictureUrl
      username
      role {
        __typename
        name
      }
      rootFolder {
        __typename
        id
      }
    }
  }
`;

export const useAuthenticatedUserQuery = (skip: boolean) => {
  return useQuery<AuthenticatedUserQuery, AuthenticatedUserQueryVariables>(queryDocument, { skip, ssr: false });
};
