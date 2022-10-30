import { gql, useQuery } from '@apollo/client';

import { PublicSnippetsQuery, PublicSnippetsQueryVariables } from '../../generated';

type UsePublicSnippetsQueryArgs = {
  itemPerPage?: number | null;
  nextToken?: string | null;
};

export const findPublicSnippetsQuery = gql`
  query publicSnippets($args: PublicSnippetsArgs!) {
    publicSnippets(args: $args) {
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
        shortContent
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

export const usePublicSnippetsQuery = (args: UsePublicSnippetsQueryArgs) => {
  return useQuery<PublicSnippetsQuery, PublicSnippetsQueryVariables>(findPublicSnippetsQuery, {
    variables: {
      args: {
        itemPerPage: args.itemPerPage,
        nextToken: args.nextToken,
      },
    },
  });
};
