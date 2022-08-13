import { useRouter } from 'next/router';

export const useFolderDirectory = () => {
  const router = useRouter();

  const navigateToFolder = (folderId: string) => {
    return router.push(`/app/folders/${folderId}`);
  };

  return {
    navigateToFolder,
  };
};
