import { AuthAlert } from '@/components/auth/auth-alert';
import { generatePageMetadata } from '@/lib/seo';

export const metadata = generatePageMetadata({
  description: 'Your Snipcode account have been created successfully',
  noIndex: true,
  title: 'Snipcode - Sign up success',
});

const SignupSuccessPage = () => {
  return (
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
  );
};

export default SignupSuccessPage;
