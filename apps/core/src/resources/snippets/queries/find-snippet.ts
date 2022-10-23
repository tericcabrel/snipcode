import { getAuthenticatedUser } from '../../../configs/authentication';
import { logger } from '../../../configs/logger';
import { QueryResolvers } from '../../../types/graphql';
import { throwApplicationError } from '../../../utils/errors/throw-error';

export const findSnippet: QueryResolvers['findSnippet'] = async (_parent, args, context) => {
  getAuthenticatedUser(context);

  try {
    const snippet = await context.db.snippet.findById(args.snippetId);
    const paths = await context.db.folder.generateBreadcrumb(snippet.folderId);

    return {
      paths,
      snippet,
    };
  } catch (err: any) {
    logger.error(err);

    return throwApplicationError(err);
  }
};
