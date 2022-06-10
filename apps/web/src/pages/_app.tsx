import { ApolloProvider } from '@apollo/client';
import type { AppProps } from 'next/app';

import useApolloClient from '@/utils/apollo';
import '@/styles/globals.css';

const SharinganApp = ({ Component, pageProps }: AppProps) => {
  const apolloClient = useApolloClient();

  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
};

export default SharinganApp;
