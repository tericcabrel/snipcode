import { getAuthenticatedUser } from '../../configs/authentication';
import { FolderResolvers } from '../../types/graphql';

export const subFoldersCountResolver: FolderResolvers['subFoldersCount'] = async (folder, _args, context) => {
  const userId = getAuthenticatedUser(context);

  const folders = await context.db.folder.findSubFolders(userId, folder.id);
  const snippets = await context.db.snippet.findByFolder(folder.id);

  return folders.length + snippets.length;
};
