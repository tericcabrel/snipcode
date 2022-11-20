import { gql, useMutation } from '@apollo/client';

import { DeleteFoldersMutation, DeleteFoldersMutationVariables } from '../../generated';

const mutationDocument = gql`
  mutation deleteFolders($folderIds: [String!]!) {
    deleteFolders(folderIds: $folderIds)
  }
`;

const useDeleteFoldersMutation = () => {
  return useMutation<DeleteFoldersMutation, DeleteFoldersMutationVariables>(mutationDocument);
};

export default useDeleteFoldersMutation;
