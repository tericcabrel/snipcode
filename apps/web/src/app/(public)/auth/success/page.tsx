import { Suspense } from 'react';

import { ApolloWrapper } from '@/lib/apollo/client';
import { generatePageMetadata } from '@/lib/seo';

import { AuthSuccessContainer } from './container';

export const metadata = generatePageMetadata({
  description: 'You have been authenticated successfully.',
  noIndex: true,
  title: 'Authentication succeeded',
});

const AuthSuccessPage = () => {
  return (
    <ApolloWrapper>
      <Suspense>
        <AuthSuccessContainer />
      </Suspense>
    </ApolloWrapper>
  );
};

export default AuthSuccessPage;
