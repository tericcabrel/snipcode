'use client';

import { useParams } from 'next/navigation';

import { Directory } from '@snipcode/front/components/directory';
import { useFindFolder } from '@snipcode/front/services';

import { useFolderDirectory } from '@/hooks/use-folder-directory';
import { EMBEDDABLE_HOST_URL, SHAREABLE_HOST_URL } from '@/lib/constants';

export const ViewFolderContainer = () => {
  const queryParams = useParams<{ id: string }>();
  const { handleBreadcrumbClick, navigateToFolder, openSnippet, rootFolderId } = useFolderDirectory();

  const folderId = queryParams.id;

  const { data, isLoading } = useFindFolder(folderId);

  const isFolderFound = !isLoading && Boolean(data);

  return (
    <div className="py-10">
      {isFolderFound ? (
        <Directory
          embeddableHostUrl={EMBEDDABLE_HOST_URL}
          folderId={folderId}
          rootFolderId={rootFolderId}
          shareableHostUrl={SHAREABLE_HOST_URL}
          title={data?.name ?? '-----'}
          onBreadcrumbPathClick={handleBreadcrumbClick}
          onNavigateToFolder={navigateToFolder}
          onSnippetClick={openSnippet}
        />
      ) : null}
    </div>
  );
};
