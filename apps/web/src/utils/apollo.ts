import { ApolloClient, InMemoryCache } from '@apollo/client';
import { withApollo } from 'next-apollo';

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  credentials: 'include',
  uri: process.env.NEXT_PUBLIC_SERVER_URL,
});

export default withApollo(apolloClient);
