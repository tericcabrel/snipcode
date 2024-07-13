import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import { useAuth } from '@/hooks/authentication/use-auth';

export const useSetAuthenticatedUser = () => {
  const queryParams = useSearchParams();
  const { redirectToDashboard, saveToken } = useAuth();

  useEffect(() => {
    const token = queryParams.get('token');

    if (token) {
      saveToken(token as string);
    }

    void redirectToDashboard();
  }, [redirectToDashboard, queryParams, saveToken]);
};
