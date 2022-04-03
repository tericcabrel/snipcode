import { RoleRepository, UserRepository } from '@sharingan/database';
import RoleService from './src/roles/role.service';
import UserService from './src/users/user.service';

const roleService = new RoleService(new RoleRepository());
const userService = new UserService(new UserRepository());

export { roleService, userService };
