import { getAuthenticatedUser } from '../../../configs/authentication';
import { QueryResolvers } from '../../../types/graphql';

export const listDirectory: QueryResolvers['listDirectory'] = async (_parent, args, context) => {
  const userId = getAuthenticatedUser(context);

  const folders = await context.db.folder.findSubFolders(userId, args.folderId);
  const snippets = await context.db.snippet.findByFolder(args.folderId);
  const paths = await context.db.folder.generateBreadcrumb(args.folderId);

  return {
    folders,
    paths,
    snippets,
  };
};
