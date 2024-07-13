import { ApolloClient, HttpLink, InMemoryCache, from } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support';

const customErrorHandler = () => {
  return onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ locations, message, path }) =>
        console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`),
      );
    }

    if (networkError) {
      console.log(`[Network error]: ${networkError}. Backend is unreachable`);
    }
  });
};

const createIsomorphicLink = () => {
  const httpLink = new HttpLink({
    credentials: 'include',
    uri: process.env.NEXT_PUBLIC_SERVER_URL,
  });

  return from([customErrorHandler(), httpLink]);
};

export const { getClient: getApolloClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: createIsomorphicLink(),
  });
});
