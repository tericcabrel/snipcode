import { AxiosRequestConfig } from 'axios';
import { Response } from 'express';
import { User } from '@sharingan/database';
import { CreateUserDto, roleService, UpdateUserDto, userService } from '@sharingan/domain';
import { GitHubUserResponse } from '../../types/auth';
import { ExpressRequestQuery } from '../../types/common';
import { env } from '../../configs/env';
import { logger } from '../../configs/logger';
import httpClient from '../../configs/http-client';
import { ROLE_USER_NOT_FOUND } from '../../utils/constants';

const GITHUB_AUTH_URL = 'https://github.com/login/oauth/access_token';
const GITHUB_API_USER_PROFILE_URL = 'https://api.github.com/user';

const requestAccessTokenFromCode = async (code: string) => {
  const authQueryObject = {
    client_id: env.GITHUB_CLIENT_ID,
    client_secret: env.GITHUB_CLIENT_SECRET,
    code,
  };
  const requestConfig: AxiosRequestConfig = {
    headers: {
      accept: 'application/json',
    },
  };
  const requestBody = {};

  const authQueryString = new URLSearchParams(Object.entries(authQueryObject)).toString();

  return httpClient.post(`${GITHUB_AUTH_URL}?${authQueryString}`, requestBody, requestConfig);
};

const retrieveGitHubUserData = async (accessToken: string) => {
  const requestConfig: AxiosRequestConfig = {
    headers: {
      Authorization: `token ${accessToken}`,
    },
  };

  return httpClient.get<GitHubUserResponse>(GITHUB_API_USER_PROFILE_URL, requestConfig);
};

const createUserFromGitHubInfo = async (data: GitHubUserResponse, roleId: string): Promise<User> => {
  const { avatar_url, email, login, name } = data;

  const createUserDto = new CreateUserDto({
    email,
    name,
    oauthProvider: 'github',
    pictureUrl: avatar_url,
    roleId,
    timezone: null,
    username: login,
  });

  createUserDto.isEnabled = true;

  return userService.create(createUserDto);
};

const updateUserFromGitHubInfo = async (user: User, data: GitHubUserResponse): Promise<User> => {
  const { avatar_url, email, login, name } = data;

  const updateUserDto = new UpdateUserDto({
    email,
    name,
    oauthProvider: 'github',
    pictureUrl: avatar_url,
    roleId: user.roleId,
    timezone: user.timezone,
    username: login,
  });

  return userService.update(user.id, updateUserDto);
};

export const authenticateWithGitHub = async (req: ExpressRequestQuery<{ code: string }>, res: Response) => {
  try {
    const requestToken = req.query.code;

    const authResponse = await requestAccessTokenFromCode(requestToken);

    const accessToken = authResponse.data.access_token;

    const userResponse = await retrieveGitHubUserData(accessToken);

    const userExist = await userService.findByEmail(userResponse.data.email);

    if (userExist) {
      req.session.userId = userExist.id;

      await updateUserFromGitHubInfo(userExist, userResponse.data);

      return res.redirect(env.WEB_AUTH_SUCCESS_URL);
    }

    const roleUser = await roleService.findByName('user');

    if (!roleUser) {
      logger.error(`Auth: ${ROLE_USER_NOT_FOUND}`);

      return res.redirect(env.WEB_AUTH_ERROR_URL);
    }

    const createdUser = await createUserFromGitHubInfo(userResponse.data, roleUser.id);

    // TODO create root folder

    req.session.userId = createdUser.id;

    return res.redirect(env.WEB_AUTH_SUCCESS_URL);
  } catch (e: any) {
    logger.error(e);

    return res.redirect(env.WEB_AUTH_ERROR_URL);
  }
};
