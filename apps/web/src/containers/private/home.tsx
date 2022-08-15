import { FolderDirectory, useAuthenticatedUser } from '@sharingan/front';
import { NextSeo } from 'next-seo';

import Layout from '@/components/layout/private/layout';
import { useFolderDirectory } from '@/hooks/use-folder-directory';

const Home = () => {
  const { data: user } = useAuthenticatedUser();
  const { handleBreadcrumbClick, navigateToFolder, openSnippet, rootFolderId } = useFolderDirectory();

  return (
    <Layout>
      <NextSeo title="Home" />
      <div className="py-10">
        <FolderDirectory
          folderId={rootFolderId}
          onBreadcrumbPathClick={handleBreadcrumbClick}
          onNavigateToFolder={navigateToFolder}
          onSnippetClick={openSnippet}
          rootFolderId={rootFolderId}
          title={`Welcome, ${user?.name}`}
        />
      </div>
    </Layout>
  );
};

export default Home;
