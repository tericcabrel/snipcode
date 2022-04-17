import { gql, useQuery } from '@apollo/client';
import { AuthenticatedUserQuery, AuthenticatedUserQueryVariables } from '@/graphql/generated';

const meDocument = gql`
  query authenticatedUser {
    me {
      __typename
      id
      email
      firstName
      lastName
      isEnabled
      pictureUrl
      username
      role {
        __typename
        name
      }
    }
  }
`;

export const useAuthenticatedUser = () => {
  return useQuery<AuthenticatedUserQuery, AuthenticatedUserQueryVariables>(meDocument, {});
};
