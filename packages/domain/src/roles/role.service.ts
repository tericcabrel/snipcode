import { Role, RoleName, dbClient } from '@sharingan/database';
import SharinganError, { errors } from '@sharingan/utils';

import CreateRoleDto from './dtos/create-role-dto';

export default class RoleService {
  async loadRoles(): Promise<void> {
    const roleAdminDto = new CreateRoleDto({
      description: 'can do everything in the application',
      level: 200,
      name: 'admin',
    });
    const roleUserDto = new CreateRoleDto({ description: "can't do everything", level: 100, name: 'user' });

    const promises = [roleAdminDto, roleUserDto].map(async (roleDto) => {
      const role = await dbClient.role.findUnique({ where: { name: roleDto.name } });

      if (!role) {
        const input = roleDto.toRole();

        return dbClient.role.create({
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
    const role = await dbClient.role.findUnique({ where: { name } });

    if (!role) {
      throw new SharinganError(errors.ROLE_USER_NOT_FOUND, 'ROLE_USER_NOT_FOUND');
    }

    return role;
  }

  async findById(id: string): Promise<Role | null> {
    return dbClient.role.findUnique({ where: { id } });
  }

  async findAll(): Promise<Role[]> {
    return dbClient.role.findMany({ orderBy: { level: 'desc' } });
  }
}
