import { listDirectoryQueryDocument } from '../../graphql/folders/queries/list-directory';
import { UpdateSnippetInput } from '../../graphql/generated';
import useUpdateSnippetMutation from '../../graphql/snippets/mutations/update-snippet';
import { findSnippetQueryDocument } from '../../graphql/snippets/queries/find-snippet';

type MutationArgs = {
  id: string;
  input: UpdateSnippetInput;
  onError: (message: string) => void;
  onSuccess: (token: string) => void;
};

type MutationFn = (args: MutationArgs) => Promise<void>;

export const useUpdateSnippet = (folderId: string) => {
  const [updateSnippetMutation, { data, error, loading }] = useUpdateSnippetMutation();

  const updateSnippet: MutationFn = async ({ id, input, onError, onSuccess }) => {
    await updateSnippetMutation({
      awaitRefetchQueries: true,
      onCompleted: (data) => {
        onSuccess(data.updateSnippet.id);
      },
      onError: (error) => {
        onError(error.message);
      },
      refetchQueries: [
        { query: listDirectoryQueryDocument, variables: { folderId } },
        { query: findSnippetQueryDocument, variables: { snippetId: id } },
      ],
      variables: {
        id,
        input,
      },
    });
  };

  return {
    isLoading: loading && !error && !data,
    updateSnippet,
  };
};
