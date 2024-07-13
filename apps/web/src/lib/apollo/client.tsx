'use client';

import { ApolloLink, HttpLink, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import {
  ApolloClient,
  ApolloNextAppProvider,
  InMemoryCache,
  SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support';
import React, { PropsWithChildren } from 'react';
import { useCookies } from 'react-cookie';

import { AUTH_COOKIE_NAME } from '@/lib/constants';

const generateAuthorizationLink = (token: string) => {
  return setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: token,
      },
    };
  });
};

const createIsomorphicLink = (token: string) => {
  const httpLink = new HttpLink({
    credentials: 'include',
    uri: process.env.NEXT_PUBLIC_SERVER_URL,
  });

  return from([generateAuthorizationLink(token), httpLink]);
};

const makeClient = (token: string) => () => {
  const httpLink = createIsomorphicLink(token);

  return new ApolloClient({
    cache: new InMemoryCache(),
    link:
      typeof window === 'undefined'
        ? ApolloLink.from([
            new SSRMultipartLink({
              stripDefer: true,
            }),
            httpLink,
          ])
        : httpLink,
  });
};

export const ApolloWrapper = ({ children }: PropsWithChildren) => {
  const [cookies] = useCookies();

  const token = cookies[AUTH_COOKIE_NAME];

  return <ApolloNextAppProvider makeClient={makeClient(token)}>{children}</ApolloNextAppProvider>;
};
