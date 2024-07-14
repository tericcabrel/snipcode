'use client';

import { Directory } from '@snipcode/front/components/directory';
import { useFindFolder } from '@snipcode/front/services';
import { useParams } from 'next/navigation';

import { useFolderDirectory } from '@/hooks/use-folder-directory';

export const ViewFolderContainer = () => {
  const queryParams = useParams<{ id: string }>();
  const { handleBreadcrumbClick, navigateToFolder, openSnippet, rootFolderId } = useFolderDirectory();

  const folderId = queryParams.id;

  const { data, isLoading } = useFindFolder(folderId);

  const isFolderFound = !isLoading && Boolean(data);

  return (
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
  );
};
