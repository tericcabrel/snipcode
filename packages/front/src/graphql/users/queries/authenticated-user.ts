import { gql, useQuery } from '@apollo/client';

import { AuthenticatedUserQuery, AuthenticatedUserQueryVariables } from '../../generated';

export const authenticatedUserQuery = gql`
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

export const useAuthenticatedUserQuery = () => {
  return useQuery<AuthenticatedUserQuery, AuthenticatedUserQueryVariables>(authenticatedUserQuery);
};
