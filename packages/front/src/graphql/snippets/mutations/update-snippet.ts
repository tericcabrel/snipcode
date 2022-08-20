import { gql, useMutation } from '@apollo/client';

import { UpdateSnippetMutation, UpdateSnippetMutationVariables } from '../../generated';

const mutationDocument = gql`
  mutation updateSnippet($id: ID!, $input: UpdateSnippetInput!) {
    updateSnippet(id: $id, input: $input) {
      __typename
      id
      name
      description
      language
      lineHighlight
      visibility
      content
      theme
      updatedAt
    }
  }
`;

const useUpdateSnippetMutation = () => {
  return useMutation<UpdateSnippetMutation, UpdateSnippetMutationVariables>(mutationDocument);
};

export default useUpdateSnippetMutation;
