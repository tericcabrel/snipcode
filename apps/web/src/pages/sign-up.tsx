import type { NextPage } from 'next';
import dynamic from 'next/dynamic';

const SignUp = dynamic(() => import('@/containers/auth/signup'));

const SignUpPage: NextPage = () => {
  return <SignUp />;
};

export default SignUpPage;
