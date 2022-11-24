import { gql, useLazyQuery } from '@apollo/client';

import { PublicSnippetsQuery, PublicSnippetsQueryVariables } from '../../generated';

export const findPublicSnippetsQuery = gql`
  query publicSnippets($input: PublicSnippetsInput!) {
    publicSnippets(input: $input) {
      __typename
      hasMore
      itemPerPage
      nextToken
      items {
        __typename
        id
        name
        description
        language
        lineHighlight
        contentHighlighted
        theme
        createdAt
        user {
          id
          username
          name
          pictureUrl
        }
      }
    }
  }
`;

export const useLazyPublicSnippetsQuery = () => {
  return useLazyQuery<PublicSnippetsQuery, PublicSnippetsQueryVariables>(findPublicSnippetsQuery, {
    fetchPolicy: 'network-only',
  });
};
