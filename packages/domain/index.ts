import { RoleRepository, UserRepository } from '@sharingan/database';
import RoleService from './src/roles/role.service';
import CreateRoleDto from './src/roles/dtos/create-role-dto';
import UserService from './src/users/user.service';
import CreateUserDto from './src/users/dtos/create-user-dto';

const roleService = new RoleService(new RoleRepository());
const userService = new UserService(new UserRepository());

export { roleService, userService, CreateRoleDto, CreateUserDto };
