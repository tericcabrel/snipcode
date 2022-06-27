import type { NextPage } from 'next';
import dynamic from 'next/dynamic';

const SignIn = dynamic(() => import('@/containers/auth/signin'));

const SignInPage: NextPage = () => {
  return <SignIn />;
};

export default SignInPage;
