import { getAuthenticatedUser } from '../../../configs/authentication';
import { MutationResolvers } from '../../../types/graphql';
import AppError from '../../../utils/app-error';
import {
  CANT_DELETE_ROOT_FOLDER_CODE,
  CANT_DELETE_ROOT_FOLDER_MESSAGE,
  FOLDERS_DONT_BELONG_TO_USER_CODE,
  FOLDERS_DONT_BELONG_TO_USER_MESSAGE,
} from '../../../utils/errors';
import { isFoldersBelongToUser, isFoldersContainRoot } from '../utils/folders';

export const deleteFolders: MutationResolvers['deleteFolders'] = async (_parent, args, context) => {
  const userId = getAuthenticatedUser(context);

  const { folderIds } = args;

  const foldersToDelete = await context.db.folder.findFolders(folderIds);

  if (!isFoldersBelongToUser(foldersToDelete, userId)) {
    throw new AppError(FOLDERS_DONT_BELONG_TO_USER_MESSAGE, FOLDERS_DONT_BELONG_TO_USER_CODE);
  }

  if (isFoldersContainRoot(foldersToDelete)) {
    throw new AppError(CANT_DELETE_ROOT_FOLDER_MESSAGE, CANT_DELETE_ROOT_FOLDER_CODE);
  }

  // TODO Delete snippets

  await context.db.folder.deleteMany(folderIds);

  return true;
};
