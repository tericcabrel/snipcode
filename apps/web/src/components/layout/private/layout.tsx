import { useAuthenticatedUser } from '@sharingan/ui';
import { ReactNode } from 'react';

import { Loader } from '@/components/common/loader';
import { Redirect } from '@/components/common/redirect';
import Header from '@/components/layout/private/header';
import { COOKIE_NAME } from '@/utils/constants';

type Props = {
  children?: ReactNode;
};

const Layout = ({ children }: Props) => {
  const { data, isLoading } = useAuthenticatedUser(COOKIE_NAME);

  if (isLoading && !data) {
    return <Loader scope="page" />;
  }

  if (!isLoading && !data) {
    return <Redirect path="/" />;
  }

  if (!data) {
    return <Redirect path="/" />;
  }

  return (
    <div className="relative w-full min-h-screen bg-gray-50 flex-grow">
      <Header />
      {children}
    </div>
  );
};

export default Layout;
