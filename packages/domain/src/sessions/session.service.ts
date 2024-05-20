import { CreateSessionDto } from './dtos/create-session-dto';
import { Session } from '../entities/session';
import { prisma } from '../utils/prisma';

export class SessionService {
  async create(createSessionDto: CreateSessionDto): Promise<Session> {
    const input = createSessionDto.toSession();

    return prisma.session.create({
      data: {
        expires: input.expires,
        id: input.id,
        token: input.token,
        userId: input.userId,
      },
    });
  }

  async deleteUserSessions(userId: string): Promise<void> {
    await prisma.session.deleteMany({ where: { userId } });
  }

  async findByToken(token: string): Promise<Session | null> {
    return prisma.session.findUnique({ where: { token } });
  }
}
