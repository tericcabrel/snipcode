import { ApolloClient, HttpLink, InMemoryCache, NormalizedCacheObject, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import merge from 'deepmerge';
import isEqual from 'lodash/isEqual';
import { useMemo } from 'react';
import { Cookies } from 'react-cookie';

import { COOKIE_NAME, IS_DEV } from '@/utils/constants';

type AppContext = {
  req?: {
    cookies: Partial<{ [key: string]: string }>;
  };
};

type InitApollo = {
  context?: AppContext;
  initialState?: any;
};

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

const isSSR = () => typeof window === 'undefined';

const getAuthorizationToken = (context?: AppContext) => {
  if (isSSR()) {
    return context?.req?.cookies[COOKIE_NAME];
  }

  const cookie = new Cookies();

  return cookie.get(COOKIE_NAME);
};

const generateAuthorizationLink = (context?: AppContext) => {
  return setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: getAuthorizationToken(context),
      },
    };
  });
};

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

const createIsomorphicLink = (context?: AppContext) => {
  const httpLink = new HttpLink({
    credentials: 'include',
    uri: process.env.NEXT_PUBLIC_SERVER_URL,
  });

  return from([generateAuthorizationLink(context), customErrorHandler(), httpLink]);
};

const createApolloClient = (ctx?: AppContext) => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    connectToDevTools: IS_DEV,
    link: createIsomorphicLink(ctx),
    ssrMode: typeof window === 'undefined',
  });
};

export const initializeApollo = ({ context, initialState }: InitApollo) => {
  const _apolloClient = apolloClient ?? createApolloClient(context);

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Merge the initialState from getStaticProps/getServerSideProps in the existing cache
    const data = merge(existingCache, initialState, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) => sourceArray.every((s) => !isEqual(d, s))),
      ],
    });

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data);
  }
  // For SSG and SSR always create a new Apollo Client
  if (isSSR()) return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
};

export const addApolloState = (client: ApolloClient<NormalizedCacheObject>, pageProps: { props: any }) => {
  pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();

  return pageProps;
};

export const useApollo = (pageProps: any) => {
  const state = pageProps[APOLLO_STATE_PROP_NAME];

  return useMemo(() => initializeApollo({ initialState: state }), [state]);
};
