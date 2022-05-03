import { ApolloClient, InMemoryCache } from '@apollo/client';

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  connectToDevTools: true,
  credentials: 'include',
  uri: process.env.NEXT_PUBLIC_SERVER_URL,
});

export default apolloClient;
