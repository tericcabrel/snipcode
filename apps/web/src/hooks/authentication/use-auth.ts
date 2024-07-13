import { useApolloClient } from '@apollo/client';
import { useAuthenticatedUser } from '@snipcode/front/services';
import { addDayToDate } from '@snipcode/utils';
import { useRouter } from 'next/navigation';
import { useCookies } from 'react-cookie';

import { AUTH_COOKIE_NAME } from '@/lib/constants';

export const useAuth = () => {
  const [, setCookie, removeCookie] = useCookies([AUTH_COOKIE_NAME]);
  const apolloClient = useApolloClient();
  const router = useRouter();

  const { data, isLoading } = useAuthenticatedUser();

  const saveToken = (token: string) => {
    const currentDate = new Date();

    setCookie(AUTH_COOKIE_NAME, token, {
      expires: addDayToDate(currentDate, 90),
      path: '/',
      sameSite: 'none',
      secure: true,
    });
  };

  const deleteToken = async () => {
    await apolloClient.clearStore();

    removeCookie(AUTH_COOKIE_NAME, { path: '/' });
  };

  const redirectToDashboard = () => router.push('/app/home');

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
