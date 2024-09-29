import { useUpdateFolderMutation } from '../../graphql/folders/mutations/update-folder';
import { findFolderQueryDocument } from '../../graphql/folders/queries/find-folder';
import { listDirectoryQueryDocument } from '../../graphql/folders/queries/list-directory';
import { UpdateFolderInput } from '../../graphql/generated';

type MutationArgs = {
  id: string;
  input: UpdateFolderInput;
  onError: (message: string) => void;
  onSuccess: (token: string) => void;
};

type MutationFn = (args: MutationArgs) => Promise<void>;

export const useUpdateFolder = (parentFolderId: string) => {
  const [updateFolderMutation, { data, error, loading }] = useUpdateFolderMutation();

  const updateFolder: MutationFn = async ({ id, input, onError, onSuccess }) => {
    await updateFolderMutation({
      awaitRefetchQueries: true,
      onCompleted: (data) => {
        onSuccess(data.updateFolder.id);
      },
      onError: (error) => {
        onError(error.message);
      },
      refetchQueries: [
        { query: listDirectoryQueryDocument, variables: { folderId: parentFolderId } },
        { query: findFolderQueryDocument, variables: { folderId: id } },
      ],
      variables: {
        id,
        input,
      },
    });
  };

  return {
    isLoading: loading && !error && !data,
    updateFolder,
  };
};
