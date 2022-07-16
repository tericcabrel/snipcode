import { useAuthenticatedUser } from '@sharingan/ui';
import { addDayToDate } from '@sharingan/utils';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';

import { COOKIE_NAME } from '@/utils/constants';

const useAuth = () => {
  const [, setCookie, removeCookie] = useCookies([COOKIE_NAME]);
  const router = useRouter();

  const { data, isLoading } = useAuthenticatedUser(COOKIE_NAME);

  const saveToken = (token: string) => {
    setCookie(COOKIE_NAME, token, { expires: addDayToDate(90), path: '/', secure: true });
  };

  const deleteToken = () => {
    removeCookie(COOKIE_NAME, { path: '/' });
    localStorage.removeItem(COOKIE_NAME);
  };

  const redirectToDashboard = () => router.push('/home');

  const redirectToSignin = () => router.push('/signin');

  const redirectToSignup = () => router.push('/signup');

  const redirectToHome = () => router.push('/');

  return {
    deleteToken,
    loading: isLoading,
    redirectToDashboard,
    redirectToHome,
    redirectToSignin,
    redirectToSignup,
    saveToken,
    user: data,
  };
};

export { useAuth };
