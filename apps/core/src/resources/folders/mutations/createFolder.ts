import { CreateFolderDto } from '@sharingan/domain';
import { ApolloError } from 'apollo-server-express';
import { getAuthenticatedUser } from '../../../configs/authentication';
import { MutationResolvers } from '../../../types/graphql';
import { FOLDER_ALREADY_EXIST_CODE, FOLDER_ALREADY_EXIST_MESSAGE } from '../../../utils/errors';

export const createFolder: MutationResolvers['createFolder'] = async (_parent, args, context) => {
  const userId = getAuthenticatedUser(context);

  const {
    input: { name, parentId },
  } = args;

  const isFolderExist = await context.db.folder.isFolderExistInParentFolder(parentId, name);

  if (isFolderExist) {
    throw new ApolloError(FOLDER_ALREADY_EXIST_MESSAGE(name), FOLDER_ALREADY_EXIST_CODE);
  }

  const createFolderDto = new CreateFolderDto(userId, name, parentId);

  return context.db.folder.create(createFolderDto);
};
