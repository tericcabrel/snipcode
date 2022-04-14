import { ReactNode } from 'react';

import PrivateHeader from '@/components/layout/private/header';
import PublicFooter from '@/components/layout/public/footer';

type Props = {
  children?: ReactNode;
};

const PrivateLayout = ({ children }: Props) => {
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
