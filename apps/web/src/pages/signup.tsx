import type { NextPage } from 'next';
import dynamic from 'next/dynamic';

const Signup = dynamic(() => import('@/containers/auth/signup'));

const SignupPage: NextPage = () => {
  return <Signup />;
};

export default SignupPage;
