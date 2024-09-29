import { useDeleteFoldersMutation } from '../../graphql/folders/mutations/delete-folders';
import { listDirectoryQueryDocument } from '../../graphql/folders/queries/list-directory';

type MutationArgs = {
  ids: string[];
  onError: (message: string) => void;
  onSuccess: () => void;
};

type MutationFn = (args: MutationArgs) => Promise<void>;

export const useDeleteFolders = (parentFolderId: string) => {
  const [deleteFoldersMutation, { data, error, loading }] = useDeleteFoldersMutation();

  const deleteFolders: MutationFn = async ({ ids, onError, onSuccess }) => {
    await deleteFoldersMutation({
      awaitRefetchQueries: true,
      onCompleted: () => {
        onSuccess();
      },
      onError: (error) => {
        onError(error.message);
      },
      refetchQueries: [{ query: listDirectoryQueryDocument, variables: { folderId: parentFolderId } }],
      variables: {
        folderIds: ids,
      },
    });
  };

  return {
    deleteFolders,
    isLoading: loading && !error && !data,
  };
};
