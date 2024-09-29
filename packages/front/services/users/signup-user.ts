import { useSignupUserMutation } from '../../graphql/users/mutations/signup-user';
import { SignupUserInput } from '../../types/queries';

type MutationArgs = {
  input: SignupUserInput;
  onError: (message: string) => void;
  onSuccess: (token: string) => void;
};

type MutationFn = (args: MutationArgs) => Promise<void>;

export const useSignupUser = () => {
  const [signupUser, { data, error, loading }] = useSignupUserMutation();

  const handler: MutationFn = async ({ input, onError, onSuccess }) => {
    await signupUser({
      onCompleted: (data) => {
        onSuccess(data.signupUser.message);
      },
      onError: (error) => {
        onError(error.message);
      },
      variables: { input },
    });
  };

  return {
    isLoading: loading && !error && !data,
    signupUser: handler,
  };
};
