import { useRouter } from 'next/navigation';

import { useAuthenticatedUser, useLazyListDirectory } from '@snipcode/front/services';

export const useFolderDirectory = () => {
  const router = useRouter();
  const { data: user } = useAuthenticatedUser();
  const { listDirectory } = useLazyListDirectory();

  const navigateToFolder = (folderId: string) => {
    return router.push(`/app/folders/${folderId}`);
  };

  const openSnippet = (snippetId: string) => {
    return router.push(`/app/snippets/${snippetId}`);
  };

  const handleBreadcrumbClick = async (folderId: string, path: string) => {
    await listDirectory({
      fetchPolicy: 'network-only',
      variables: {
        folderId,
      },
    });

    router.push(path);
  };

  return {
    handleBreadcrumbClick,
    navigateToFolder,
    openSnippet,
    rootFolderId: user?.rootFolderId ?? '',
  };
};
