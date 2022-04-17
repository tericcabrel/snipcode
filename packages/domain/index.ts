import { RoleRepository, UserRepository } from '@sharingan/database';
import RoleService from './src/roles/role.service';
import CreateRoleDto from './src/roles/dtos/create-role-dto';
import UserService from './src/users/user.service';
import CreateUserDto from './src/users/dtos/create-user-dto';
import NewsletterService from './src/newsletters/newsletter.service';

const roleService = new RoleService(new RoleRepository());
const userService = new UserService(new UserRepository());
const newsletterService = new NewsletterService();

export { newsletterService, roleService, userService, CreateRoleDto, CreateUserDto };
export type { NewsletterService, RoleService, UserService };
