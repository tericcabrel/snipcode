import useCreateFolderMutation from '../../graphql/folders/mutations/create-folder';
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
      onCompleted: (data) => {
        onSuccess(data.createFolder.id);
      },
      onError: (error) => {
        onError(error.message);
      },
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
