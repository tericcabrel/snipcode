import { gql, useQuery } from '@apollo/client';

import { FindSnippetQuery, FindSnippetQueryVariables } from '../../generated';

export const findSnippetQueryDocument = gql`
  query findSnippet($snippetId: String!) {
    findSnippet(snippetId: $snippetId) {
      paths {
        id
        name
      }
      snippet {
        __typename
        id
        name
        description
        language
        lineHighlight
        visibility
        content
        theme
        createdAt
        updatedAt
        folder {
          id
        }
      }
    }
  }
`;

export const useFindSnippetQuery = (snippetId: string) => {
  return useQuery<FindSnippetQuery, FindSnippetQueryVariables>(findSnippetQueryDocument, {
    variables: {
      snippetId,
    },
  });
};
