'use client';

import { Directory } from '@snipcode/front/components/directory';
import { useAuthenticatedUser } from '@snipcode/front/services';

import { useFolderDirectory } from '@/hooks/use-folder-directory';

export const HomeContainer = () => {
  const { data: user } = useAuthenticatedUser();
  const { handleBreadcrumbClick, navigateToFolder, openSnippet, rootFolderId } = useFolderDirectory();

  return (
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
  );
};
