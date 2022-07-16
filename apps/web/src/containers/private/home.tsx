import { Folder } from '@sharingan/ui';
import { NextSeo } from 'next-seo';

import Layout from '@/components/layout/private/layout';
import { useAuthenticatedUser } from '@/services/users/authenticated-user';

const Home = () => {
  const { data } = useAuthenticatedUser();

  return (
    <Layout>
      <NextSeo title="Home" />
      <div className="py-10">
        <Folder.Directory folderId={data?.id ?? ''} title={`Welcome, ${data?.name}`} />
      </div>
    </Layout>
  );
};

export default Home;
