import { gql, useMutation } from '@apollo/client';

import { CreateFolderMutation, CreateFolderMutationVariables } from '../../generated';

const mutationDocument = gql`
  mutation createFolder($input: CreateFolderInput!) {
    createFolder(input: $input) {
      id
    }
  }
`;

export const useCreateFolderMutation = () => {
  return useMutation<CreateFolderMutation, CreateFolderMutationVariables>(mutationDocument);
};
