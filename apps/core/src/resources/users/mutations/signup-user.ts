import { CreateUserDto, CreateUserRootFolderDto } from '@snipcode/domain';

import { logger } from '../../../configs/logger';
import { MutationResolvers } from '../../../types/graphql';
import { throwApplicationError } from '../../../utils/errors/throw-error';

export const signupUser: MutationResolvers['signupUser'] = async (_parent, args, context) => {
  try {
    const { email, name, password } = args.input;

    const role = await context.db.role.findByName('user');

    const createUserDto = new CreateUserDto({
      email,
      name,
      oauthProvider: 'email',
      password,
      pictureUrl: null,
      roleId: role.id,
      timezone: null,
      username: null,
    });

    const user = await context.db.user.create(createUserDto);

    const createUserRootFolderDto = new CreateUserRootFolderDto(user.id);

    await context.db.folder.createUserRootFolder(createUserRootFolderDto);

    // TODO published user created event

    return { message: 'Account created successfully!' };
  } catch (err) {
    logger.error(err);

    return throwApplicationError(err);
  }
};
