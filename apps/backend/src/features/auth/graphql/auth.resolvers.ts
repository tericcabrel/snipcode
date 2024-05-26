import { UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Args, Context, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import {
  CreateSessionInput,
  CreateUserInput,
  CreateUserRootFolderInput,
  Folder,
  FolderService,
  Role,
  RoleService,
  SessionService,
  User,
  UserService,
} from '@snipcode/domain';
import { addDayToDate } from '@snipcode/utils';

import { AuthGuard, UserId } from '../../../configs/auth.guard';
import { EnvironmentVariables } from '../../../configs/environment';
import { GraphQLContext } from '../../../types/common';
import { LoginResult, SignupUserInput, SignupUserResult } from '../../../types/graphql.schema';
import { AUTH_USER_NOT_FOUND, AUTH_USER_NOT_FOUND_CODE } from '../../../utils/constants';
import { GraphQLAppError } from '../../../utils/errors';

@Resolver('User')
export class AuthResolvers {
  constructor(
    private readonly configService: ConfigService<EnvironmentVariables, true>,
    private readonly roleService: RoleService,
    private readonly userService: UserService,
    private readonly sessionService: SessionService,
    private readonly folderService: FolderService,
  ) {}

  @Query('authenticatedUser')
  @UseGuards(AuthGuard)
  async authenticatedUser(@Context() context: GraphQLContext): Promise<User> {
    const { userId } = context.req;

    if (!userId) {
      throw new GraphQLAppError(AUTH_USER_NOT_FOUND, AUTH_USER_NOT_FOUND_CODE);
    }

    const user = await this.userService.findById(userId);

    if (!user) {
      throw new GraphQLAppError(AUTH_USER_NOT_FOUND, AUTH_USER_NOT_FOUND_CODE);
    }

    return user;
  }

  @Mutation('loginUser')
  async loginUser(@Args('email') email: string, @Args('password') password: string): Promise<LoginResult> {
    const user = await this.userService.login(email, password);

    const sessionLifetime = this.configService.get<number>('SESSION_LIFETIME');

    const sessionInput = new CreateSessionInput({
      expireDate: addDayToDate(sessionLifetime),
      userId: user.id,
    });

    const session = await this.sessionService.create(sessionInput);

    return { token: session.token };
  }

  @Mutation('logoutUser')
  @UseGuards(AuthGuard)
  async logoutUser(@UserId() userId: string | undefined): Promise<boolean> {
    console.log('user logged out', userId);

    if (!userId) {
      return false;
    }

    await this.sessionService.deleteUserSessions(userId);

    return true;
  }

  @Mutation('signupUser')
  async signupUser(@Args('input') input: SignupUserInput): Promise<SignupUserResult> {
    const { email, name, password } = input;

    const role = await this.roleService.findByName('user');

    const createUserDto = new CreateUserInput({
      email,
      name,
      oauthProvider: 'email',
      password,
      pictureUrl: null,
      roleId: role.id,
      timezone: null,
      username: null,
    });

    const user = await this.userService.create(createUserDto);

    const createUserRootFolderDto = new CreateUserRootFolderInput(user.id);

    await this.folderService.createUserRootFolder(createUserRootFolderDto);

    // TODO published user created event

    return { message: 'Account created successfully!' };
  }

  @ResolveField()
  async folders(@Parent() user: User): Promise<Folder[]> {
    return this.folderService.findUserFolders(user.id);
  }

  @ResolveField()
  async role(@Parent() user: User): Promise<Role | null> {
    return this.roleService.findById(user.roleId);
  }

  @ResolveField()
  async rootFolder(@Parent() user: User): Promise<Folder> {
    return this.folderService.findUserRootFolder(user.id);
  }
}
