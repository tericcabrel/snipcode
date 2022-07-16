import useLoginUserMutation from '../../graphql/users/mutations/login-user';
import { LoginInput } from '../../typings/queries';

type MutationArgs = {
  input: LoginInput;
  onError: (message: string) => void;
  onSuccess: (token: string) => void;
};

type MutationFn = (args: MutationArgs) => Promise<void>;

export const useLoginUser = () => {
  const [loginUser, { data, error, loading }] = useLoginUserMutation();

  const authenticateUser: MutationFn = async ({ input, onError, onSuccess }) => {
    await loginUser({
      onCompleted: (data) => {
        onSuccess(data.loginUser.token);
      },
      onError: (error) => {
        onError(error.message);
      },
      variables: input,
    });
  };

  return {
    authenticateUser,
    isLoading: loading && !error && !data,
  };
};
