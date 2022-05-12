import type { NextPage } from 'next';
import Link from 'next/link';

import PublicLayout from '@/components/layout/public/public-layout';

const AuthSuccessPage: NextPage = () => {
  return (
    <PublicLayout>
      <h1>Auth Success !</h1>
      <Link href="/board">
        <a className="py-4 px-4 block">Go to Dashboard</a>
      </Link>
    </PublicLayout>
  );
};

export default AuthSuccessPage;
