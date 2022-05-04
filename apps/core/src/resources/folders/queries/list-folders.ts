import { getAuthenticatedUser } from '../../../configs/authentication';
import { QueryResolvers } from '../../../types/graphql';

export const listFolders: QueryResolvers['listFolders'] = async (_parent, args, context) => {
  const userId = getAuthenticatedUser(context);
  const { folderId } = args;

  if (folderId) {
    return context.db.folder.findSubFolders(folderId);
  }

  const rootFolder = await context.db.folder.findUserRootFolder(userId);

  if (!rootFolder) {
    return [];
  }

  return context.db.folder.findSubFolders(rootFolder.id);
};
