import { CreateSnippetInput } from '../../graphql/generated';
import useCreateSnippetMutation from '../../graphql/snippets/mutations/create-snippet';

type MutationArgs = {
  input: CreateSnippetInput;
  onError: (message: string) => void;
  onSuccess: (token: string) => void;
};

type MutationFn = (args: MutationArgs) => Promise<void>;

export const useCreateSnippet = () => {
  const [createSnippetMutation, { data, error, loading }] = useCreateSnippetMutation();

  const createSnippet: MutationFn = async ({ input, onError, onSuccess }) => {
    await createSnippetMutation({
      onCompleted: (data) => {
        onSuccess(data.createSnippet.id);
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
    createSnippet,
    isLoading: loading && !error && !data,
  };
};
