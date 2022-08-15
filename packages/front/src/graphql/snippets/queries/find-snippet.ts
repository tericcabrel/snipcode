import { gql, useQuery } from '@apollo/client';

import { FindSnippetQuery, FindSnippetQueryVariables } from '../../generated';

const queryDocument = gql`
  query findSnippet($snippetId: String!) {
    findSnippet(snippetId: $snippetId) {
      paths {
        id
        name
      }
      snippet {
        id
        name
        description
        language
        lineHighLight
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
  return useQuery<FindSnippetQuery, FindSnippetQueryVariables>(queryDocument, {
    variables: {
      snippetId,
    },
  });
};
