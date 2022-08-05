import { gql, useQuery } from '@apollo/client';

import { ListDirectoryQuery, ListDirectoryQueryVariables } from '../../generated';

const queryDocument = gql`
  query listDirectory($folderId: String!) {
    listDirectory(folderId: $folderId) {
      folders {
        id
        name
        subFoldersCount
      }
      snippets {
        id
        name
        language
      }
      paths {
        id
        name
      }
    }
  }
`;

export const useListDirectoryQuery = (folderId: string) => {
  return useQuery<ListDirectoryQuery, ListDirectoryQueryVariables>(queryDocument, {
    variables: {
      folderId,
    },
  });
};
