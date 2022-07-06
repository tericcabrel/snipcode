import { ReactNode } from 'react';

import { Loader } from '@/components/common/loader';
import { Redirect } from '@/components/common/redirect';
import PrivateHeader from '@/components/layout/private/header';
import Sidebar from '@/components/layout/private/sidebar';
import PublicFooter from '@/components/layout/public/footer';
import { useAuthenticatedUser } from '@/services/users/authenticated-user';

type Props = {
  children?: ReactNode;
};

const PrivateLayout = ({ children }: Props) => {
  const { data, isLoading } = useAuthenticatedUser();

  console.log(data);

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
    <div className="relative w-full h-screen bg-gray-50 flex-grow">
      <Sidebar />
      <div className="flex-grow border border-4 bg-red-500"></div>
      {/*<PrivateHeader user={data} />
        <div className="relative top-[65px]">
          {children}
          <PublicFooter />
        </div>*/}
    </div>
  );
};

export default PrivateLayout;
