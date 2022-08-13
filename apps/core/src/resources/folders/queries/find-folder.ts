import { getAuthenticatedUser } from '../../../configs/authentication';
import { logger } from '../../../configs/logger';
import { QueryResolvers } from '../../../types/graphql';
import { throwApplicationError } from '../../../utils/errors/throw-error';

export const findFolder: QueryResolvers['findFolder'] = async (_parent, args, context) => {
  getAuthenticatedUser(context);

  try {
    return context.db.folder.findById(args.folderId);
  } catch (err: any) {
    logger.error(err);

    return throwApplicationError(err);
  }
};
