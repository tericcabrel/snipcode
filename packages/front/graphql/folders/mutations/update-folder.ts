import { gql, useMutation } from '@apollo/client';

import { UpdateFolderMutation, UpdateFolderMutationVariables } from '../../generated';

const mutationDocument = gql`
  mutation updateFolder($id: ID!, $input: UpdateFolderInput!) {
    updateFolder(id: $id, input: $input) {
      __typename
      id
      name
      updatedAt
    }
  }
`;

export const useUpdateFolderMutation = () => {
  return useMutation<UpdateFolderMutation, UpdateFolderMutationVariables>(mutationDocument);
};
