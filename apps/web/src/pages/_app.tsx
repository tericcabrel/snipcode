import type { AppProps } from 'next/app';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import '@/styles/globals.css';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  credentials: 'include',
  uri: process.env.NEXT_PUBLIC_SERVER_URL,
});

const SharinganApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
};

export default SharinganApp;
