import { Suspense } from 'react';

import { AuthSuccessContainer } from './container';

import { ApolloWrapper } from '@/lib/apollo/client';
import { generatePageMetadata } from '@/lib/seo';

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
