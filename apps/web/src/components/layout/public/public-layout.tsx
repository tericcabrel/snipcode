import { ReactNode } from 'react';

import PublicFooter from '@/components/layout/public/footer';
import PublicHeader from '@/components/layout/public/header';

type Props = {
  children: ReactNode;
};

const PublicLayout = ({ children }: Props) => {
  return (
    <div>
      <PublicHeader />
      <div className="relative top-[65px]">
        {children}
        <PublicFooter />
      </div>
    </div>
  );
};

export default PublicLayout;
