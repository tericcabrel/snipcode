import { Folder } from '../../../types/models';
import { getAuthenticatedUser } from '../../../configs/authentication';
import { MutationResolvers } from '../../../types/graphql';
import AppError from '../../../utils/app-error';
import { FOLDERS_DONT_BELONG_TO_USER_CODE, FOLDERS_DONT_BELONG_TO_USER_MESSAGE } from '../../../utils/errors';

const isFoldersBelongToUser = (folders: Folder[], userId: string): boolean => {
  return folders.every((folder) => folder.userId === userId);
};

export const deleteFolders: MutationResolvers['deleteFolders'] = async (_parent, args, context) => {
  const userId = getAuthenticatedUser(context);

  const { folderIds } = args;

  const foldersToDelete = await context.db.folder.findFolders(folderIds);

  if (!isFoldersBelongToUser(foldersToDelete, userId)) {
    throw new AppError(FOLDERS_DONT_BELONG_TO_USER_MESSAGE, FOLDERS_DONT_BELONG_TO_USER_CODE);
  }

  // TODO Delete snippets

  await context.db.folder.deleteMany(folderIds);

  return true;
};
