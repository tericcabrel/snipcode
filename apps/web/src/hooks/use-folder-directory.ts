import { useAuthenticatedUser, useLazyListDirectory } from '@sharingan/front';
import { useRouter } from 'next/router';

export const useFolderDirectory = () => {
  const router = useRouter();
  const { data: user } = useAuthenticatedUser();
  const { listDirectory } = useLazyListDirectory();

  const navigateToFolder = (folderId: string) => {
    return router.push(`/app/folders/${folderId}`);
  };

  const handleBreadcrumbClick = async (folderId: string, path: string) => {
    await listDirectory({
      fetchPolicy: 'network-only',
      variables: {
        folderId,
      },
    });

    await router.push(path);
  };

  return {
    handleBreadcrumbClick,
    navigateToFolder,
    rootFolderId: user?.rootFolderId ?? '',
  };
};
