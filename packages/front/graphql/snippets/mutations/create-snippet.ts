import { gql, useMutation } from '@apollo/client';

import { CreateSnippetMutation, CreateSnippetMutationVariables } from '../../generated';

const mutationDocument = gql`
  mutation createSnippet($input: CreateSnippetInput!) {
    createSnippet(input: $input) {
      id
    }
  }
`;

export const useCreateSnippetMutation = () => {
  return useMutation<CreateSnippetMutation, CreateSnippetMutationVariables>(mutationDocument);
};
