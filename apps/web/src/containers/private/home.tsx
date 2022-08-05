import { FolderDirectory, useAuthenticatedUser } from '@sharingan/front';
import { NextSeo } from 'next-seo';

import Layout from '@/components/layout/private/layout';
import { COOKIE_NAME } from '@/utils/constants';

const Home = () => {
  const { data } = useAuthenticatedUser(COOKIE_NAME);

  return (
    <Layout>
      <NextSeo title="Home" />
      <div className="py-10">
        <FolderDirectory folderId={data?.rootFolderId ?? ''} title={`Welcome, ${data?.name}`} />
      </div>
    </Layout>
  );
};

export default Home;
