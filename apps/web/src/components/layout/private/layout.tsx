import { ToastProvider } from '@sharingan/front/components/toast/provider';
import { useAuthenticatedUser } from '@sharingan/front/services';
import { ReactNode } from 'react';

import { Loader } from '@/components/common/loader';
import { Redirect } from '@/components/common/redirect';
import { Header } from '@/components/layout/private/header';

type Props = {
  children?: ReactNode;
};

const Layout = ({ children }: Props) => {
  const { data, isLoading } = useAuthenticatedUser();

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
      <ToastProvider>
        <Header />
        {children}
      </ToastProvider>
    </div>
  );
};

export { Layout };
