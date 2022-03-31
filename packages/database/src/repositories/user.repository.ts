import UserRepositoryInterface from './interfaces/user';
import User from '../entities/user';
import prisma from '../prisma';

export default class UserRepository implements UserRepositoryInterface {
  create(user: User): Promise<User> {
    return prisma.user.create({
      data: {
        email: user.email,
        firstName: user.firstName,
        id: user.id,
        isEnabled: user.isEnabled,
        lastName: user.lastName,
        pictureUrl: user.pictureUrl,
        roleId: user.roleId,
        updatedAt: new Date(),
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
        email: user.email,
        firstName: user.firstName,
        isEnabled: user.isEnabled,
        lastName: user.lastName,
        pictureUrl: user.pictureUrl,
        roleId: user.roleId,
        updatedAt: new Date(),
        username: user.username,
      },
      where: { id },
    });
  }

  updatePassword(id: string, newPassword: string): Promise<User> {
    return prisma.user.update({
      data: {
        password: newPassword,
      },
      where: { id },
    });
  }
}
