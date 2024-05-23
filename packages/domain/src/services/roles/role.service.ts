import { Injectable } from '@nestjs/common';
import { SnipcodeError, errors } from '@snipcode/utils';

import { CreateRoleInput } from './inputs/create-role-input';
import { Role, RoleName } from './role.entity';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class RoleService {
  constructor(private readonly prisma: PrismaService) {}

  async loadRoles(): Promise<void> {
    const roleAdminInput = new CreateRoleInput({
      description: 'can do everything in the application',
      level: 200,
      name: 'admin',
    });
    const roleUserInput = new CreateRoleInput({ description: "can't do everything", level: 100, name: 'user' });

    const promises = [roleAdminInput, roleUserInput].map(async (roleInput) => {
      const role = await this.prisma.role.findUnique({ where: { name: roleInput.name } });

      if (!role) {
        const input = roleInput.toRole();

        return this.prisma.role.create({
          data: {
            description: input.description,
            id: input.id,
            level: input.level,
            name: input.name,
          },
        });
      }

      return null;
    });

    await Promise.all(promises);
  }

  async findByName(name: RoleName): Promise<Role> {
    const role = await this.prisma.role.findUnique({ where: { name } });

    if (!role) {
      throw new SnipcodeError(errors.ROLE_USER_NOT_FOUND, 'ROLE_USER_NOT_FOUND');
    }

    return role;
  }

  async findById(id: string): Promise<Role | null> {
    return this.prisma.role.findUnique({ where: { id } });
  }

  async findAll(): Promise<Role[]> {
    return this.prisma.role.findMany({ orderBy: { level: 'desc' } });
  }
}
