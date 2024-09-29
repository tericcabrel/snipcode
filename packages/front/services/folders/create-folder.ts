import { useCreateFolderMutation } from '../../graphql/folders/mutations/create-folder';
import { listDirectoryQueryDocument } from '../../graphql/folders/queries/list-directory';
import { CreateFolderInput } from '../../graphql/generated';

type MutationArgs = {
  input: CreateFolderInput;
  onError: (message: string) => void;
  onSuccess: (token: string) => void;
};

type MutationFn = (args: MutationArgs) => Promise<void>;

export const useCreateFolder = () => {
  const [createFolderMutation, { data, error, loading }] = useCreateFolderMutation();

  const createFolder: MutationFn = async ({ input, onError, onSuccess }) => {
    await createFolderMutation({
      awaitRefetchQueries: true,
      onCompleted: (data) => {
        onSuccess(data.createFolder.id);
      },
      onError: (error) => {
        onError(error.message);
      },
      refetchQueries: [{ query: listDirectoryQueryDocument, variables: { folderId: input.parentId } }],
      variables: {
        input,
      },
    });
  };

  return {
    createFolder,
    isLoading: loading && !error && !data,
  };
};
