import { gql, useMutation } from '@apollo/client';

import { DeleteSnippetMutation, DeleteSnippetMutationVariables } from '../../generated';

const mutationDocument = gql`
  mutation deleteSnippet($id: ID!) {
    deleteSnippet(id: $id)
  }
`;

export const useDeleteSnippetMutation = () => {
  return useMutation<DeleteSnippetMutation, DeleteSnippetMutationVariables>(mutationDocument);
};
