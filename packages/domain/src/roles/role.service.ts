import { Role, RoleName, RoleRepository } from '@sharingan/database';

import CreateRoleDto from './dtos/create-role-dto';

export default class RoleService {
  constructor(private roleRepository: RoleRepository) {}

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    return this.roleRepository.create(createRoleDto.toRole());
  }

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
        return this.create(roleDto);
      }

      return null;
    });

    await Promise.all(promises);
  }

  async findByName(name: RoleName): Promise<Role | null> {
    return this.roleRepository.findByName(name);
  }

  async findById(id: string): Promise<Role | null> {
    return this.roleRepository.findById(id);
  }

  async findAll(): Promise<Role[]> {
    return this.roleRepository.findAll();
  }

  async deleteMany(ids: string[]): Promise<void> {
    const promises = ids.map((id) => this.roleRepository.delete(id));

    await Promise.all(promises);
  }
}
