import { ReactNode } from 'react';
import PublicHeader from '@/components/layout/public/header';
import PublicFooter from '@/components/layout/public/footer';

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
