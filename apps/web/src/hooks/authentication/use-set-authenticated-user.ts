import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useAuth } from '@/hooks/authentication/use-auth';

export const useSetAuthenticatedUser = () => {
  const router = useRouter();
  const { saveToken } = useAuth();

  useEffect(() => {
    const { token } = router.query;

    if (token) {
      saveToken(token as string);
    }

    void router.push('/board');
  }, [router.query]);
};
