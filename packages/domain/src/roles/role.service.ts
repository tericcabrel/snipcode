import { Role, RoleName, RoleRepositoryInterface } from '@sharingan/database';
import SharinganError, { errors } from '@sharingan/utils';

import CreateRoleDto from './dtos/create-role-dto';

export default class RoleService {
  constructor(private roleRepository: RoleRepositoryInterface) {}

  async loadRoles(): Promise<void> {
    const roleAdminDto = new CreateRoleDto({
      description: 'can do everything in the application',
      level: 200,
      name: 'admin',
    });
    const roleUserDto = new CreateRoleDto({ description: "can't do everything", level: 100, name: 'user' });

    const promises = [roleAdminDto, roleUserDto].map(async (roleDto) => {
      const role = await this.roleRepository.findByName(roleDto.name);

      if (!role) {
        return this.roleRepository.create(roleDto.toRole());
      }

      return null;
    });

    await Promise.all(promises);
  }

  async findByName(name: RoleName): Promise<Role> {
    const role = await this.roleRepository.findByName(name);

    if (!role) {
      throw new SharinganError(errors.ROLE_USER_NOT_FOUND, 'ROLE_USER_NOT_FOUND');
    }

    return role;
  }

  async findById(id: string): Promise<Role | null> {
    return this.roleRepository.findById(id);
  }

  async findAll(): Promise<Role[]> {
    return this.roleRepository.findAll();
  }
}
