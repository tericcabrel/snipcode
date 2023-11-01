import type { NextPage } from 'next';
import { NextSeo } from 'next-seo';

import { AuthAlert } from '@/components/auth/auth-alert';
import { PublicLayout } from '@/components/layout/public/public-layout';

const AuthErrorPage: NextPage = () => {
  return (
    <PublicLayout>
      <NextSeo title="Authentication failed" nofollow noindex />
      <AuthAlert
        ctaLabel="Go to home"
        descriptionElement={
          <>
            An error occurred while authenticating
            <br />
            Please contact the{' '}
            <a className="text-blue-500" href="mailto:contact@snipcode.dev">
              support
            </a>{' '}
            if the error persist.
          </>
        }
        redirectLink="/"
        title="Authentication failed ❌"
      />
    </PublicLayout>
  );
};

export default AuthErrorPage;
