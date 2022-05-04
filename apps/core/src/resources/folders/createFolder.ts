import { CreateFolderDto } from '@sharingan/domain';
import { MutationResolvers } from '../../types/graphql';

export const createFolder: MutationResolvers['createFolder'] = async (_parent, args, context) => {
  // TODO check authentication
  const createFolderDto = new CreateFolderDto(<string>context.req.session.userId, args.input.name, args.input.parentId);

  return context.db.folder.create(createFolderDto);
};
