import User from '../entities/user';
import prisma from '../prisma';
import UserRepositoryInterface from './interfaces/user';

export default class UserRepository implements UserRepositoryInterface {
  create(user: User): Promise<User> {
    return prisma.user.create({
      data: {
        email: user.email,
        id: user.id,
        isEnabled: user.isEnabled,
        name: user.name,
        oauthProvider: user.oauthProvider,
        pictureUrl: user.pictureUrl,
        roleId: user.roleId,
        timezone: user.timezone,
        username: user.username,
      },
    });
  }

  async delete(id: string): Promise<void> {
    const role = await prisma.user.findUnique({ where: { id } });

    if (role) {
      await prisma.user.delete({ where: { id } });
    }
  }

  findAll(): Promise<User[]> {
    return prisma.user.findMany({ orderBy: { createdAt: 'desc' } });
  }

  findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { email } });
  }

  findById(id: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { id } });
  }

  update(id: string, user: User): Promise<User> {
    return prisma.user.update({
      data: {
        isEnabled: user.isEnabled,
        name: user.name,
        pictureUrl: user.pictureUrl,
        roleId: user.roleId,
        timezone: user.timezone,
        updatedAt: new Date(),
      },
      where: { id },
    });
  }
}
