import type { NextPage } from 'next';
import { NextSeo } from 'next-seo';

import AuthAlert from '@/components/auth/auth-alert';
import PublicLayout from '@/components/layout/public/public-layout';
import useSetAuthenticatedUser from '@/hooks/authentication/use-set-authenticated-user';

const AuthSuccessPage: NextPage = () => {
  useSetAuthenticatedUser();

  return (
    <PublicLayout>
      <NextSeo title="Authentication succeed" nofollow noindex />
      <AuthAlert
        ctaLabel="Go to Dashboard"
        descriptionElement={
          <>
            We are applying some latest configuration
            <br />
            You will be redirected in few seconds.
          </>
        }
        redirectLink="/board"
        title="Authenticated successfully 🎉"
      />
    </PublicLayout>
  );
};

export default AuthSuccessPage;
