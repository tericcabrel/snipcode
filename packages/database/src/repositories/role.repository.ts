import RoleRepositoryInterface from './interfaces/role';
import Role, { RoleName } from '../entities/role';
import prisma from '../prisma';

export default class RoleRepository implements RoleRepositoryInterface {
  create(item: Role): Promise<Role> {
    return prisma.role.create({
      data: {
        description: item.description,
        id: item.id,
        level: item.level,
        name: item.name,
      },
    });
  }

  async delete(id: string): Promise<void> {
    const role = await prisma.role.findFirst({ where: { id } });

    if (role) {
      await prisma.role.delete({ where: { id } });
    }
  }

  findAll(): Promise<Role[]> {
    return prisma.role.findMany({ orderBy: { level: 'desc' } });
  }

  findById(id: string): Promise<Role | null> {
    return prisma.role.findUnique({ where: { id } });
  }

  findByName(name: RoleName): Promise<Role | null> {
    return prisma.role.findUnique({ where: { name } });
  }

  update(id: string, item: Role): Promise<Role> {
    return prisma.role.update({
      data: {
        description: item.description,
        level: item.level,
        name: item.name,
      },
      where: { id },
    });
  }
}
