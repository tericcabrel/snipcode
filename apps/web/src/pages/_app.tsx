import { ApolloProvider } from '@apollo/client';
import type { AppProps } from 'next/app';

import GlobalSeo from '@/components/seo/seo';
import { useApollo } from '@/utils/apollo-client';
import '@/styles/globals.css';

const SharinganApp = ({ Component, pageProps }: AppProps) => {
  const apolloClient = useApollo(pageProps);

  return (
    <ApolloProvider client={apolloClient}>
      <GlobalSeo />
      <Component {...pageProps} />
    </ApolloProvider>
  );
};

export default SharinganApp;
