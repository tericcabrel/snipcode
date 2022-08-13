import { FolderDirectory, useAuthenticatedUser } from '@sharingan/front';
import { NextSeo } from 'next-seo';

import Layout from '@/components/layout/private/layout';
import { useFolderDirectory } from '@/hooks/use-folder-directory';
import { COOKIE_NAME } from '@/utils/constants';

const Home = () => {
  const { data } = useAuthenticatedUser(COOKIE_NAME);
  const { navigateToFolder } = useFolderDirectory();

  return (
    <Layout>
      <NextSeo title="Home" />
      <div className="py-10">
        <FolderDirectory
          folderId={data?.rootFolderId ?? ''}
          onNavigateToFolder={navigateToFolder}
          title={`Welcome, ${data?.name}`}
        />
      </div>
    </Layout>
  );
};

export default Home;
