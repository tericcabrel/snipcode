import { ApolloClient, InMemoryCache } from '@apollo/client';
import { useCookies } from 'react-cookie';

import { COOKIE_NAME } from '@/utils/constants';

const useApolloClient = () => {
  const [cookies] = useCookies([COOKIE_NAME]);

  return new ApolloClient({
    cache: new InMemoryCache(),
    connectToDevTools: true,
    credentials: 'include',
    headers: {
      Authorization: cookies[COOKIE_NAME],
    },
    uri: process.env.NEXT_PUBLIC_SERVER_URL,
  });
};

export default useApolloClient;
