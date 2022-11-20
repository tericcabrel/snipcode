import { ReactNode } from 'react';

import { PublicFooter } from '@/components/layout/public/footer';
import { PublicHeader } from '@/components/layout/public/header';

type Props = {
  children: ReactNode;
};

const PublicLayout = ({ children }: Props) => {
  return (
    <div className="overflow-x-hidden bg-gray-50 min-h-screen">
      <PublicHeader />
      {children}
      <PublicFooter />
    </div>
  );
};

export { PublicLayout };
