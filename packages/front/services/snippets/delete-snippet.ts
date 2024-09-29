import { listDirectoryQueryDocument } from '../../graphql/folders/queries/list-directory';
import { useDeleteSnippetMutation } from '../../graphql/snippets/mutations/delete-snippet';

type MutationArgs = {
  id: string;
  onError: (message: string) => void;
  onSuccess: () => void;
};

type MutationFn = (args: MutationArgs) => Promise<void>;

export const useDeleteSnippet = (folderId: string) => {
  const [deleteSnippetMutation, { data, error, loading }] = useDeleteSnippetMutation();

  const deleteSnippet: MutationFn = async ({ id, onError, onSuccess }) => {
    await deleteSnippetMutation({
      awaitRefetchQueries: true,
      onCompleted: () => {
        onSuccess();
      },
      onError: (error) => {
        onError(error.message);
      },
      refetchQueries: [{ query: listDirectoryQueryDocument, variables: { folderId } }],
      variables: {
        id,
      },
    });
  };

  return {
    deleteSnippet,
    isLoading: loading && !error && !data,
  };
};
