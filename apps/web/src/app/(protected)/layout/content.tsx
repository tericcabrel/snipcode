'use client';

import { useAuthenticatedUser } from '@snipcode/front/services';
import { ReactNode } from 'react';

import { Header } from './header';

import { Loader } from '@/components/common/loader';
import { Redirect } from '@/components/common/redirect';

type Props = {
  children?: ReactNode;
};

export const AuthenticatedLayout = ({ children }: Props) => {
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
      <Header />
      {children}
    </div>
  );
};
