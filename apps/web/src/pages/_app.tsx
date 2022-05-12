import { ApolloProvider } from '@apollo/client';
import type { AppProps } from 'next/app';

import apolloClient from '@/utils/apollo';
import '@/styles/globals.css';

const SharinganApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
};

export default SharinganApp;
