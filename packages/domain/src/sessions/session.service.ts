import { Session, dbClient } from '@snipcode/database';

import CreateSessionDto from './dtos/create-session-dto';

export default class SessionService {
  async create(createSessionDto: CreateSessionDto): Promise<Session> {
    const input = createSessionDto.toSession();

    return dbClient.session.create({
      data: {
        expires: input.expires,
        id: input.id,
        token: input.token,
        userId: input.userId,
      },
    });
  }

  async deleteUserSessions(userId: string): Promise<void> {
    await dbClient.session.deleteMany({ where: { userId } });
  }

  async findByToken(token: string): Promise<Session | null> {
    return dbClient.session.findUnique({ where: { token } });
  }
}
