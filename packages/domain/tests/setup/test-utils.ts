import { randEmail, randFullName, randImg, randTimeZone, randUserName } from '@ngneat/falso';
import { Folder, FolderRepository, Role, RoleName, RoleRepository, User, UserRepository } from '@sharingan/database';

import { CreateUserDto } from '../../index';
import CreateFolderDto from '../../src/folders/dtos/create-folder-dto';
import CreateUserRootFolderDto from '../../src/folders/dtos/create-user-root-folder-dto';

const userRepository = new UserRepository();
const roleRepository = new RoleRepository();
const folderRepository = new FolderRepository();

type CreateManyTestFoldersArgs = {
  folderNames: string[];
  parentId: string;
  userId: string;
};

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

export const deleteTestFoldersById = async (folderIds: Array<string | undefined>): Promise<void[]> => {
  const promises = folderIds.map((folderId) => {
    if (!folderId) {
      return;
    }

    return folderRepository.delete(folderId);
  });

  return Promise.all(promises);
};

export const createUserWithRootFolder = async (): Promise<[User, Folder]> => {
  const user = await createTestUser();
  const rootFolder = await folderRepository.create(new CreateUserRootFolderDto(user.id).toFolder());

  return [user, rootFolder];
};

export const createManyTestFolders = async ({
  folderNames,
  parentId,
  userId,
}: CreateManyTestFoldersArgs): Promise<Folder[]> => {
  const promises = folderNames.map((name) => {
    const createFolderDto = new CreateFolderDto({
      name,
      parentId,
      userId,
    });

    return folderRepository.create(createFolderDto.toFolder());
  });

  return Promise.all(promises);
};
