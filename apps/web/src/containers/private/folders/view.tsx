import { FolderDirectory, useAuthenticatedUser, useFindFolder, useLazyListDirectory } from '@sharingan/front';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';

import Layout from '@/components/layout/private/layout';
import { useFolderDirectory } from '@/hooks/use-folder-directory';

const FolderView = () => {
  const router = useRouter();
  const { handleBreadcrumbClick, navigateToFolder, openSnippet, rootFolderId } = useFolderDirectory();

  const folderId = router.query.id as string;

  const { data, isLoading } = useFindFolder(folderId);

  const isFolderFound = !isLoading && Boolean(data);

  return (
    <Layout>
      <NextSeo title={data?.name ?? 'Folder'} />
      <div className="py-10">
        {isFolderFound && (
          <FolderDirectory
            folderId={folderId}
            onBreadcrumbPathClick={handleBreadcrumbClick}
            onNavigateToFolder={navigateToFolder}
            onSnippetClick={openSnippet}
            rootFolderId={rootFolderId}
            title={data?.name ?? '-----'}
          />
        )}
      </div>
    </Layout>
  );
};

export default FolderView;
