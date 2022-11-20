import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useAuth } from '@/hooks/authentication/use-auth';

const useSetAuthenticatedUser = () => {
  const router = useRouter();
  const { redirectToDashboard, saveToken } = useAuth();

  useEffect(() => {
    const { token } = router.query;

    if (token) {
      saveToken(token as string);
    }

    void redirectToDashboard();
  }, [router.query]);
};

export { useSetAuthenticatedUser };
