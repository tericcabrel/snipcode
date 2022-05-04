import { CreateFolderDto } from '@sharingan/domain';
import { getAuthenticatedUser } from '../../configs/authentication';
import { MutationResolvers } from '../../types/graphql';

export const createFolder: MutationResolvers['createFolder'] = async (_parent, args, context) => {
  const userId = getAuthenticatedUser(context);

  const {
    input: { name, parentId },
  } = args;

  const createFolderDto = new CreateFolderDto(userId, name, parentId);

  return context.db.folder.create(createFolderDto);
};
