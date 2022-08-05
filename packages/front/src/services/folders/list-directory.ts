import { useListDirectoryQuery } from '../../graphql/folders/queries/list-directory';
import { ListDirectoryQuery } from '../../graphql/generated';
import { DirectoryList } from '../../typings/queries';

const formatAuthenticatedUserResult = (folderId: string, data?: ListDirectoryQuery): DirectoryList | undefined => {
  if (!data?.listDirectory) {
    return;
  }

  const { folders, paths, snippets } = data.listDirectory;

  return {
    folders: folders.map((folder) => ({ ...folder, fileCount: folder.subFoldersCount })),
    paths,
    snippets: snippets.map((snippet) => ({ ...snippet, folderId })),
  };
};

export const useListDirectory = (folderId: string) => {
  const query = useListDirectoryQuery(folderId);

  const data = formatAuthenticatedUserResult(folderId, query.data);

  return {
    data,
    isLoading: query.loading && !query.error && !query.data,
  };
};
