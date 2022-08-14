import { FolderDirectory, useAuthenticatedUser, useLazyListDirectory } from '@sharingan/front';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';

import Layout from '@/components/layout/private/layout';
import { useFolderDirectory } from '@/hooks/use-folder-directory';

const Home = () => {
  const router = useRouter();
  const { data } = useAuthenticatedUser();
  const { navigateToFolder } = useFolderDirectory();
  const { listDirectory } = useLazyListDirectory();

  const rootFolderId = data?.rootFolderId ?? '';

  const handleBreadcrumbClick = async (folderId: string, path: string) => {
    await listDirectory({
      fetchPolicy: 'network-only',
      variables: {
        folderId,
      },
    });

    await router.push(path);
  };

  return (
    <Layout>
      <NextSeo title="Home" />
      <div className="py-10">
        <FolderDirectory
          folderId={rootFolderId}
          onBreadcrumbPathClick={handleBreadcrumbClick}
          onNavigateToFolder={navigateToFolder}
          rootFolderId={rootFolderId}
          title={`Welcome, ${data?.name}`}
        />
      </div>
    </Layout>
  );
};

export default Home;
