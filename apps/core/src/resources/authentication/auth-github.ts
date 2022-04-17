import { AxiosRequestConfig } from 'axios';
import { Response } from 'express';
import { User } from '@sharingan/database';
import { CreateUserDto, roleService, userService } from '@sharingan/domain';
import { GitHubUserResponse } from '../../types/auth';
import { ExpressRequestQuery } from '../../types/common';
import { env } from '../../configs/env';
import { logger } from '../../configs/logger';
import httpClient from '../../configs/http-client';

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

  const createUserDto = new CreateUserDto(email, name, '', roleId, '', 'github', avatar_url, null, login);

  return userService.create(createUserDto);
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

      return res.redirect(env.WEB_AUTH_SUCCESS_URL);
    }

    const roleUser = await roleService.findByName('user');

    if (!roleUser) {
      logger.error('Auth: Role user not found');

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
