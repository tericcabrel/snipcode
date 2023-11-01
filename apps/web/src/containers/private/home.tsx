import { Directory } from '@snipcode/front/components/directory';
import { useAuthenticatedUser } from '@snipcode/front/services';
import { NextSeo } from 'next-seo';

import { Layout } from '@/components/layout/private/layout';
import { useFolderDirectory } from '@/hooks/use-folder-directory';

const PrivateHome = () => {
  const { data: user } = useAuthenticatedUser();
  const { handleBreadcrumbClick, navigateToFolder, openSnippet, rootFolderId } = useFolderDirectory();

  return (
    <Layout>
      <NextSeo title="Home" />
      <div className="py-10">
        <Directory
          folderId={rootFolderId}
          rootFolderId={rootFolderId}
          title={`Welcome, ${user?.name}`}
          onBreadcrumbPathClick={handleBreadcrumbClick}
          onNavigateToFolder={navigateToFolder}
          onSnippetClick={openSnippet}
        />
      </div>
    </Layout>
  );
};

export { PrivateHome };
