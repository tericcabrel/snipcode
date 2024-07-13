'use client';

import { AuthAlert } from '@/components/auth/auth-alert';
import { useSetAuthenticatedUser } from '@/hooks/authentication/use-set-authenticated-user';

export const AuthSuccessContainer = () => {
  useSetAuthenticatedUser();

  return (
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
  );
};
