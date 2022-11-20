import type { NextPage } from 'next';
import { NextSeo } from 'next-seo';

import { AuthAlert } from '@/components/auth/auth-alert';
import { PublicLayout } from '@/components/layout/public/public-layout';

const SignupSuccessPage: NextPage = () => {
  return (
    <PublicLayout>
      <NextSeo title="Sign up success" />
      <AuthAlert
        ctaLabel="Go to sign in page"
        descriptionElement={
          <>
            We sent a confirmation link to your email address.
            <br />
            Please, click on the link to activate your account and star managing your code snippets.
          </>
        }
        redirectLink="/signin"
        title="Your account have been created successfully 🎉"
      />
    </PublicLayout>
  );
};

export default SignupSuccessPage;
