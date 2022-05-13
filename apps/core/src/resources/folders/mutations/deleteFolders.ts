import { getAuthenticatedUser } from '../../../configs/authentication';
import { logger } from '../../../configs/logger';
import { MutationResolvers } from '../../../types/graphql';
import { throwApplicationError } from '../../../utils/errors/throw-error';

export const deleteFolders: MutationResolvers['deleteFolders'] = async (_parent, args, context) => {
  const userId = getAuthenticatedUser(context);

  try {
    await context.db.folder.deleteMany(args.folderIds, userId);
  } catch (err: any) {
    logger.error(err);

    throwApplicationError(err);
  }

  return true;
};
