import { ReactNode } from 'react';

import { Loader } from '@/components/common/loader';
import { Redirect } from '@/components/common/redirect';
import Header from '@/components/layout/private/header';
import { useAuthenticatedUser } from '@/services/users/authenticated-user';

type Props = {
  children?: ReactNode;
};

const PrivateLayout = ({ children }: Props) => {
  const { data, isLoading } = useAuthenticatedUser();

  if (isLoading) {
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

export default PrivateLayout;
