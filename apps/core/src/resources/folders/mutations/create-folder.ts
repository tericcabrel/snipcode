import { CreateFolderDto } from '@snipcode/domain';

import { getAuthenticatedUser } from '../../../configs/authentication';
import { logger } from '../../../configs/logger';
import { MutationResolvers } from '../../../types/graphql';
import { throwApplicationError } from '../../../utils/errors/throw-error';

export const createFolder: MutationResolvers['createFolder'] = async (_parent, { input }, context) => {
  const userId = getAuthenticatedUser(context);

  const { name, parentId } = input;

  const createFolderDto = new CreateFolderDto({ name, parentId, userId });

  try {
    return context.db.folder.create(createFolderDto);
  } catch (err: any) {
    logger.error(err);

    return throwApplicationError(err);
  }
};
