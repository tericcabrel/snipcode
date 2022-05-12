import type { NextPage } from 'next';

import PublicLayout from '@/components/layout/public/public-layout';

const AuthErrorPage: NextPage = () => {
  return (
    <PublicLayout>
      <h1>Auth Error !</h1>
    </PublicLayout>
  );
};

export default AuthErrorPage;
