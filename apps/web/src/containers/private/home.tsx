import { Folder } from '@sharingan/ui';
import { NextSeo } from 'next-seo';

import MenuAction from '@/components/common/menu-action';
import Layout from '@/components/layout/private/layout';
import { useAuthenticatedUser } from '@/services/users/authenticated-user';

const Home = () => {
  const { data } = useAuthenticatedUser();

  return (
    <Layout>
      <NextSeo title="Home" />
      <div className="py-10">
        <header>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <div className="text-3xl font-bold leading-tight text-gray-900">Welcome, {data?.name}</div>
            <MenuAction />
          </div>
        </header>
        <main>
          <div className="max-w-7xl py-8 mx-auto sm:px-6 lg:px-8">
            <Folder.Directory folderId={data?.id ?? ''} />
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default Home;
