import { UpdateFolderDto } from '@sharingan/domain';

import { getAuthenticatedUser } from '../../../configs/authentication';
import { logger } from '../../../configs/logger';
import { MutationResolvers } from '../../../types/graphql';
import { throwApplicationError } from '../../../utils/errors/throw-error';

export const updateFolder: MutationResolvers['updateFolder'] = async (_parent, { id, input }, context) => {
  const userId = getAuthenticatedUser(context);

  const updateFolderDto = new UpdateFolderDto({
    creatorId: userId,
    folderId: id,
    name: input.name,
  });

  try {
    return context.db.folder.update(updateFolderDto);
  } catch (err: any) {
    logger.error(err);

    return throwApplicationError(err);
  }
};
