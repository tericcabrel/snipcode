import axios from 'axios';
import { Request, Response } from 'express';
import { CreateUserDto, roleService, userService } from '@sharingan/domain';
import { env } from '../../configs/env';
import { GitHubUserResponse } from '../../types/auth';
import { logger } from '../../configs/logger';

export const authGithub = async (req: Request, res: Response) => {
  try {
    const requestToken = req.query.code as string;

    const authQueryObject = {
      client_id: env.GITHUB_CLIENT_ID,
      client_secret: env.GITHUB_CLIENT_SECRET,
      code: requestToken,
    };

    const authQueryString = new URLSearchParams(Object.entries(authQueryObject)).toString();

    const authResponse = await axios.post(
      `https://github.com/login/oauth/access_token?${authQueryString}`,
      {},
      {
        headers: {
          accept: 'application/json',
        },
      },
    );

    const accessToken = authResponse.data.access_token;

    const userResponse = await axios.get<GitHubUserResponse>('https://api.github.com/user', {
      headers: {
        Authorization: `token ${accessToken}`,
      },
    });

    const { avatar_url, email, login, name } = userResponse.data;

    const userExist = await userService.findByEmail(email);

    if (userExist) {
      req.session.userId = userExist.id;

      return res.redirect('http://localhost:7500/auth/success');
    }

    const roleUser = await roleService.findByName('user');

    if (!roleUser) {
      logger.error('Auth: Role user not found');

      return res.redirect('http://localhost:7500/auth/error');
    }

    const createUserDto = new CreateUserDto(
      email,
      name,
      '',
      roleUser.id,
      accessToken,
      'github',
      avatar_url,
      null,
      login,
    );

    const createdUser = await userService.create(createUserDto);

    // TODO create root folder

    req.session.userId = createdUser.id;

    return res.redirect('http://localhost:7500/auth/success');
  } catch (e) {
    logger.error(e);

    return res.redirect('http://localhost:7500/auth/error');
  }
};
