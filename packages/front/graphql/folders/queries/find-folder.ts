import { gql, useQuery } from '@apollo/client';

import { FindFolderQuery, FindFolderQueryVariables } from '../../generated';

export const findFolderQueryDocument = gql`
  query findFolder($folderId: String!) {
    findFolder(folderId: $folderId) {
      id
      name
    }
  }
`;

export const useFindFolderQuery = (folderId: string) => {
  return useQuery<FindFolderQuery, FindFolderQueryVariables>(findFolderQueryDocument, {
    variables: {
      folderId,
    },
  });
};
