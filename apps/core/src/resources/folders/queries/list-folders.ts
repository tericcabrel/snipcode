import { getAuthenticatedUser } from '../../../configs/authentication';
import { QueryResolvers } from '../../../types/graphql';

export const listFolders: QueryResolvers['listFolders'] = async (_parent, args, context) => {
  const userId = getAuthenticatedUser(context);

  return context.db.folder.findSubFolders(userId, args.folderId);
};
