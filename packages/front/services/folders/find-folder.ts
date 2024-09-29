import { useFindFolderQuery } from '../../graphql/folders/queries/find-folder';
import { FindFolderQuery } from '../../graphql/generated';
import { FindFolderData } from '../../types/queries';

const formatFindFolderResult = (data?: FindFolderQuery): FindFolderData | undefined => {
  if (!data?.findFolder) {
    return;
  }

  const {
    findFolder: { id, name },
  } = data;

  return {
    id,
    name,
  };
};

export const useFindFolder = (folderId: string) => {
  const query = useFindFolderQuery(folderId);

  const data = formatFindFolderResult(query.data);

  return {
    data,
    isLoading: query.loading && !query.error && !query.data,
  };
};
