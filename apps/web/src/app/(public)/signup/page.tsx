import { SignupContainer } from './container';

import { ApolloWrapper } from '@/lib/apollo/client';
import { generatePageMetadata } from '@/lib/seo';

export const metadata = generatePageMetadata({
  description: 'Create an account to access all features',
  title: 'Snipcode - Sign up',
});

const SignupPage = () => {
  return (
    <ApolloWrapper>
      <SignupContainer />
    </ApolloWrapper>
  );
};

export default SignupPage;
