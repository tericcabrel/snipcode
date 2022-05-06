import { CreateFolderDto } from '@sharingan/domain';
import { ApolloError } from 'apollo-server-express';
import { getAuthenticatedUser } from '../../../configs/authentication';
import { MutationResolvers } from '../../../types/graphql';
import { FOLDER_ALREADY_EXIST_CODE, FOLDER_ALREADY_EXIST_MESSAGE } from '../../../utils/errors';

export const createFolder: MutationResolvers['createFolder'] = async (_parent, { input }, context) => {
  const userId = getAuthenticatedUser(context);

  const { name, parentId } = input;

  const isFolderExist = await context.db.folder.isFolderExistInParentFolder(parentId, name);

  if (isFolderExist) {
    throw new ApolloError(FOLDER_ALREADY_EXIST_MESSAGE(name), FOLDER_ALREADY_EXIST_CODE);
  }

  const createFolderDto = new CreateFolderDto({ name, parentId, userId });

  return context.db.folder.create(createFolderDto);
};
