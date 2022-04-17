import { ReactNode } from 'react';

import PrivateHeader from '@/components/layout/private/header';
import PublicFooter from '@/components/layout/public/footer';
import { useAuthenticatedUser } from '@/graphql/queries/users/authenticated-user';
import { Redirect } from '@/components/common/redirect';
import { Loader } from '@/components/common/loader';

type Props = {
  children?: ReactNode;
};

const PrivateLayout = ({ children }: Props) => {
  const { data, loading } = useAuthenticatedUser();

  if (loading) {
    return <Loader scope="page" />;
  }

  if (!loading && !data) {
    return <Redirect path="/" />;
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col flex-1">
        <PrivateHeader />
        <div className="relative top-[65px]">
          {children}
          <PublicFooter />
        </div>
      </div>
    </div>
  );
};

export default PrivateLayout;
