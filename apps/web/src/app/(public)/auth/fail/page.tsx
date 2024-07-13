import { AuthAlert } from '@/components/auth/auth-alert';
import { generatePageMetadata } from '@/lib/seo';

export const metadata = generatePageMetadata({
  description: 'An error occurred while authenticating',
  noIndex: true,
  title: 'Snipcode - Authentication failed',
});

const AuthErrorPage = () => {
  return (
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
  );
};

export default AuthErrorPage;
