import { useCookies } from 'react-cookie';

import { useAuthenticatedUser } from '@/services/users/authenticated-user';
import { COOKIE_NAME } from '@/utils/constants';

const useAuth = () => {
  const [, setCookie, removeCookie] = useCookies([COOKIE_NAME]);

  const { data, isLoading } = useAuthenticatedUser();

  const saveToken = (token: string) => {
    setCookie(COOKIE_NAME, token, { path: '/', secure: true });
  };

  const deleteToken = () => {
    removeCookie(COOKIE_NAME, { path: '/' });
  };

  return {
    deleteToken,
    loading: isLoading,
    saveToken,
    user: data,
  };
};

export { useAuth };
