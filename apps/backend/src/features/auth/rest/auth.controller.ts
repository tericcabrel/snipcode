import { Controller, Get, Logger, Query, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  CreateSessionInput,
  CreateUserRootFolderInput,
  FolderService,
  RoleService,
  SessionService,
  UserService,
} from '@snipcode/domain';
import { addDayToDate, errors } from '@snipcode/utils';
import { Response } from 'express';

import { EnvironmentVariables } from '../../../configs/environment';
import { AUTH_SUCCESS_URL } from '../../../utils/constants';
import { GithubService } from '../services/github.service';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(
    private readonly configService: ConfigService<EnvironmentVariables, true>,
    private readonly githubService: GithubService,
    private readonly userService: UserService,
    private readonly roleService: RoleService,
    private readonly folderService: FolderService,
    private readonly sessionService: SessionService,
  ) {}

  @Get('github/callback')
  async authenticateWithGitHub(@Query('code') requestToken: string, @Res() res: Response): Promise<void> {
    const sessionLifetime = this.configService.get<number>('SESSION_LIFETIME');
    const webAuthSuccessUrl = this.configService.get<string>('WEB_AUTH_SUCCESS_URL');
    const webAuthErrorUrl = this.configService.get<string>('WEB_AUTH_ERROR_URL');

    const accessToken = await this.githubService.requestAccessTokenFromCode(requestToken);

    const githubUserData = await this.githubService.retrieveGitHubUserData(accessToken);

    const userExist = await this.userService.findByEmail(githubUserData.email);

    if (userExist) {
      const sessionInput = new CreateSessionInput({
        expireDate: addDayToDate(new Date(), sessionLifetime),
        userId: userExist.id,
      });
      const session = await this.sessionService.create(sessionInput);

      const updateUserInput = this.githubService.generateUserUpdateInputFromGitHubData(userExist, githubUserData);

      await this.userService.update(userExist, updateUserInput);

      return res.redirect(AUTH_SUCCESS_URL(webAuthSuccessUrl, session.token));
    }

    const roleUser = await this.roleService.findByName('user');

    if (!roleUser) {
      this.logger.error(`GitHub Authentication: ${errors.ROLE_USER_NOT_FOUND}`);

      return res.redirect(webAuthErrorUrl);
    }

    const createUserInput = this.githubService.generateUserRegistrationInputFromGitHubData(githubUserData, roleUser.id);

    const createdUser = await this.userService.create(createUserInput);

    const createUserRootFolderInput = new CreateUserRootFolderInput(createdUser.id);

    await this.folderService.createUserRootFolder(createUserRootFolderInput);

    const sessionInput = new CreateSessionInput({
      expireDate: addDayToDate(new Date(), sessionLifetime),
      userId: createdUser.id,
    });

    const session = await this.sessionService.create(sessionInput);

    return res.redirect(AUTH_SUCCESS_URL(webAuthSuccessUrl, session.token));
  }
}
