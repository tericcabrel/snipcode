import { Session } from '@sharingan/database';
import { CreateSessionDto, sessionService } from '@sharingan/domain';
import { addDayToDate } from '@sharingan/utils';

import { env } from '../../configs/env';

export const createUserSession = async (userId: string): Promise<Session> => {
  const sessionInput = new CreateSessionDto({
    expireDate: addDayToDate(env.SESSION_LIFETIME),
    userId,
  });

  return sessionService.create(sessionInput);
};

export const authSuccessURL = (sessionToken: string): string => {
  return `${env.WEB_AUTH_SUCCESS_URL}?token=${sessionToken}`;
};
