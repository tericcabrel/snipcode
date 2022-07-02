import { randEmail, randFullName, randImg, randNumber, randTimeZone, randUserName, randWord } from '@ngneat/falso';
import {
  Folder,
  FolderRepository,
  OauthProvider,
  Role,
  RoleName,
  RoleRepository,
  Session,
  SessionRepository,
  Snippet,
  SnippetRepository,
  SnippetVisibility,
  User,
  UserRepository,
  dbId,
} from '@sharingan/database';

import { CreateUserDto } from '../../index';
import CreateFolderDto from '../../src/folders/dtos/create-folder-dto';
import CreateUserRootFolderDto from '../../src/folders/dtos/create-user-root-folder-dto';
import CreateSessionDto from '../../src/sessions/dtos/create-session-dto';
import CreateSnippetDto from '../../src/snippets/dtos/create-snippet-dto';
import UpdateUserDto from '../../src/users/dtos/update-user-dto';

const userRepository = new UserRepository();
const roleRepository = new RoleRepository();
const folderRepository = new FolderRepository();
const snippetRepository = new SnippetRepository();
const sessionRepository = new SessionRepository();

type CreateManyTestFoldersArgs = {
  folderNames: string[];
  parentId: string;
  userId: string;
};

type CreateTestUserDtoArgs = {
  isEnabled?: boolean;
  oauthProvider?: OauthProvider;
  password?: string | null;
  roleId: string;
};

type CreateTestUserArgs = {
  isEnabled?: boolean;
  oauthProvider?: OauthProvider;
  password?: string | null;
  roleName?: RoleName;
};

export const findTestRole = async (name: RoleName): Promise<Role> => {
  const role = await roleRepository.findByName(name);

  if (!role) {
    throw new Error(`Role with the name "${name}" not found!`);
  }

  return role;
};

export const createTestUserDto = ({
  isEnabled,
  oauthProvider,
  password,
  roleId,
}: CreateTestUserDtoArgs): CreateUserDto => {
  const dto = new CreateUserDto({
    email: randEmail(),
    name: randFullName(),
    oauthProvider: oauthProvider ?? 'github',
    password: password ?? null,
    pictureUrl: randImg({ category: 'people' }),
    roleId,
    timezone: randTimeZone(),
    username: randUserName(),
  });

  dto.isEnabled = Boolean(isEnabled);

  return dto;
};

export const createTestUser = async ({
  isEnabled,
  oauthProvider,
  password,
  roleName = 'user',
}: CreateTestUserArgs): Promise<User> => {
  const role = await findTestRole(roleName);

  const createUserDto = createTestUserDto({ isEnabled, oauthProvider, password, roleId: role.id });

  return userRepository.create(createUserDto.toUser());
};

export const deleteTestUsersById = async (userIds: Array<string | undefined>): Promise<void[]> => {
  const promises = userIds.map((userId) => {
    if (!userId) {
      return;
    }

    return userRepository.delete(userId);
  });

  return Promise.all(promises);
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
  const user = await createTestUser({});
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

export const generateTestId = (): string => dbId.generate();

export const createTestFolderDto = (args?: { parentId?: string; userId?: string }): CreateFolderDto => {
  return new CreateFolderDto({
    name: randWord(),
    parentId: args?.parentId ?? generateTestId(),
    userId: args?.userId ?? generateTestId(),
  });
};

export const createTestSnippetDto = (
  args: { folderId?: string; name?: string; userId?: string; visibility?: SnippetVisibility } | undefined,
): CreateSnippetDto => {
  const languages = ['java', 'js', 'ts', 'c', 'c++', 'python', 'go', 'php', 'csharp'];
  const extensions = ['java', 'js', 'ts', 'c', 'cpp', 'py', 'go', 'php', 'cs'];

  const index = randNumber({ max: languages.length - 1, min: 0 });

  return new CreateSnippetDto({
    content: randWord({ length: randNumber({ max: 30, min: 5 }) }).join('\n'),
    description: randWord({ length: randNumber({ max: 20, min: 10 }) }).join(' '),
    folderId: args?.folderId ?? generateTestId(),
    language: languages[index],
    name: args?.name ?? `${randWord()}.${extensions[index]}`,
    userId: args?.userId ?? generateTestId(),
    visibility: args?.visibility ?? 'public',
  });
};

export const deleteTestSnippetsById = async (snippetIds: Array<string | undefined>): Promise<void[]> => {
  const promises = snippetIds.map((snippetId) => {
    if (!snippetId) {
      return;
    }

    return snippetRepository.delete(snippetId);
  });

  return Promise.all(promises);
};

export const createTestSnippet = async (
  args: { folderId?: string; name?: string; userId?: string; visibility?: SnippetVisibility } | undefined,
): Promise<Snippet> => {
  const createSnippetDto = createTestSnippetDto(args);

  return snippetRepository.create(createSnippetDto.toSnippet());
};

export const updateTestUserDto = (roleId: string): UpdateUserDto => {
  const providers: OauthProvider[] = ['email', 'google', 'github', 'stackoverflow'];
  const index = randNumber({ max: 2, min: 0 });

  return new UpdateUserDto({
    name: randFullName(),
    oauthProvider: providers[index],
    pictureUrl: randImg({ category: 'arch' }),
    roleId,
    timezone: randTimeZone(),
  });
};

export const createTestSessionDto = (userId: string): CreateSessionDto => {
  return new CreateSessionDto({
    expireDate: new Date(),
    userId,
  });
};

export const createTestSession = async (args: { userId: string }): Promise<Session> => {
  const createSessionDto = createTestSessionDto(args.userId);

  return sessionRepository.create(createSessionDto.toSession());
};

export const deleteTestUserSessions = async (userId: string): Promise<void> => {
  return sessionRepository.deleteUserSessions(userId);
};
