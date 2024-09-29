import { useSubscribeToNewsletterMutation } from '../../graphql/newsletters/mutations/subscribe-newsletter';

type MutationArgs = {
  input: { email: string };
  onError: (message: string) => void;
  onSuccess: (token: string) => void;
};

type MutationFn = (args: MutationArgs) => Promise<void>;

export const useSubscribeToNewsletter = () => {
  const [subscribeToNewsletter, { data, error, loading }] = useSubscribeToNewsletterMutation();

  const handler: MutationFn = async ({ input, onError, onSuccess }) => {
    await subscribeToNewsletter({
      onCompleted: (data) => {
        onSuccess(data.subscribeToNewsletter.message);
      },
      onError: (error) => {
        onError(error.message);
      },
      variables: input,
    });
  };

  return {
    isLoading: loading && !error && !data,
    subscribeToNewsletter: handler,
  };
};
