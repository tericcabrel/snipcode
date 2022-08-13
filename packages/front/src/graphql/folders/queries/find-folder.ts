import { gql, useQuery } from '@apollo/client';

import { FindFolderQuery, FindFolderQueryVariables } from '../../generated';

const queryDocument = gql`
  query findFolder($folderId: String!) {
    findFolder(folderId: $folderId) {
      id
      name
    }
  }
`;

export const useFindFolderQuery = (folderId: string) => {
  return useQuery<FindFolderQuery, FindFolderQueryVariables>(queryDocument, {
    variables: {
      folderId,
    },
  });
};
