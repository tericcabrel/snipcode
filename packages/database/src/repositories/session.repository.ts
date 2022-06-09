import Session from '../entities/session';
import prisma from '../prisma';
import SessionRepositoryInterface from './interfaces/session';

export default class SessionRepository implements SessionRepositoryInterface {
  create(item: Session): Promise<Session> {
    return prisma.session.create({
      data: {
        expires: item.expires,
        id: item.id,
        token: item.token,
        userId: item.userId,
      },
    });
  }

  async deleteUserSessions(userId: string): Promise<void> {
    await prisma.session.deleteMany({ where: { userId } });
  }
}
