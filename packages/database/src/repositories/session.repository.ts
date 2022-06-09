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
        userId: item.id,
      },
    });
  }

  async delete(id: string): Promise<void> {
    const session = await prisma.session.findFirst({ where: { id } });

    if (session) {
      await prisma.session.delete({ where: { id } });
    }
  }

  findByToken(token: string): Promise<Session | null> {
    return prisma.session.findUnique({ where: { token } });
  }
}
