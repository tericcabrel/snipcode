import { ApolloWrapper } from '@/lib/apollo/client';
import { generatePageMetadata } from '@/lib/seo';

import { SignInContainer } from './container';

export const metadata = generatePageMetadata({
  description: 'Sign in to your account',
  title: 'Snipcode - Sign in',
});

const SignInPage = () => {
  return (
    <ApolloWrapper>
      <SignInContainer />
    </ApolloWrapper>
  );
};

export default SignInPage;
