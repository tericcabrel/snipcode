import { Directory } from '@snipcode/front/components/directory';
import { useFindFolder } from '@snipcode/front/services';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';

import { Layout } from '@/components/layout/private/layout';
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
          <Directory
            folderId={folderId}
            rootFolderId={rootFolderId}
            title={data?.name ?? '-----'}
            onBreadcrumbPathClick={handleBreadcrumbClick}
            onNavigateToFolder={navigateToFolder}
            onSnippetClick={openSnippet}
          />
        )}
      </div>
    </Layout>
  );
};

export { FolderView };
