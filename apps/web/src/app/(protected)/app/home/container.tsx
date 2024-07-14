'use client';

import { Directory } from '@snipcode/front/components/directory';
import { useAuthenticatedUser } from '@snipcode/front/services';

import { useFolderDirectory } from '@/hooks/use-folder-directory';
import { EMBEDDABLE_HOST_URL, SHAREABLE_HOST_URL } from '@/lib/constants';

export const HomeContainer = () => {
  const { data: user } = useAuthenticatedUser();
  const { handleBreadcrumbClick, navigateToFolder, openSnippet, rootFolderId } = useFolderDirectory();

  return (
    <div className="py-10">
      <Directory
        embeddableHostUrl={EMBEDDABLE_HOST_URL}
        folderId={rootFolderId}
        rootFolderId={rootFolderId}
        shareableHostUrl={SHAREABLE_HOST_URL}
        title={`Welcome, ${user?.name}`}
        onBreadcrumbPathClick={handleBreadcrumbClick}
        onNavigateToFolder={navigateToFolder}
        onSnippetClick={openSnippet}
      />
    </div>
  );
};
