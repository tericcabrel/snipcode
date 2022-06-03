import { randEmail, randFullName, randImg, randTimeZone, randUserName } from '@ngneat/falso';
import { FolderRepository, Role, RoleName, RoleRepository, User, UserRepository } from '@sharingan/database';

import { CreateUserDto } from '../../index';

const userRepository = new UserRepository();
const roleRepository = new RoleRepository();
const folderRepository = new FolderRepository();

export const cleanTestRoles = async () => {
  const allRoles = await roleRepository.findAll();

  await Promise.all(allRoles.map((role) => roleRepository.delete(role.id)));
};

export const cleanTestUsers = async () => {
  const allUsers = await userRepository.findAll();

  await Promise.all(allUsers.map((user) => userRepository.delete(user.id)));
};

const findRole = async (name: RoleName): Promise<Role> => {
  const role = await roleRepository.findByName(name);

  if (!role) {
    throw new Error(`Role with the name "${name}" not found!`);
  }

  return role;
};

export const createTestUser = async (roleName: RoleName = 'user'): Promise<User> => {
  const role = await findRole(roleName);

  const createUserDto = new CreateUserDto({
    email: randEmail(),
    name: randFullName(),
    oauthProvider: 'github',
    pictureUrl: randImg({ category: 'people' }),
    roleId: role.id,
    timezone: randTimeZone(),
    username: randUserName(),
  });

  return userRepository.create(createUserDto.toUser());
};

export const deleteTestUser = async (user: User): Promise<void> => {
  return userRepository.delete(user.id);
};

export const deleteTestFolderById = async (folderId?: string): Promise<void> => {
  if (!folderId) {
    return;
  }

  return folderRepository.delete(folderId);
};
