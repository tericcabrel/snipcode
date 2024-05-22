import { randEmail, randFullName, randImg, randNumber, randTimeZone, randUserName, randWord } from '@ngneat/falso';

import {
  Folder,
  OauthProvider,
  Role,
  RoleName,
  Session,
  Snippet,
  SnippetVisibility,
  User,
  dbClient,
  dbID,
} from '../index';
import { CreateFolderDto } from '../src/folders/dtos/create-folder-dto';
import { CreateUserRootFolderDto } from '../src/folders/dtos/create-user-root-folder-dto';
import { UpdateFolderDto } from '../src/folders/dtos/update-folder-dto';
import { CreateSessionDto } from '../src/sessions/dtos/create-session-dto';
import { CreateSnippetDto } from '../src/snippets/dtos/create-snippet-dto';
import { DeleteSnippetDto } from '../src/snippets/dtos/delete-snippet-dto';
import { UpdateSnippetDto } from '../src/snippets/dtos/update-snippet-dto';
import { CreateUserDto } from '../src/users/dtos/create-user-dto';
import { UpdateUserDto } from '../src/users/dtos/update-user-dto';

type CreateManyTestFoldersArgs = {
  folderNames: string[];
  parentId: string;
  userId: string;
};

type CreateTestUserDtoArgs = {
  email?: string;
  isEnabled?: boolean;
  oauthProvider?: OauthProvider;
  password?: string | null;
  roleId: string;
  username?: string | null;
};

type CreateTestUserArgs = {
  email?: string;
  isEnabled?: boolean;
  oauthProvider?: OauthProvider;
  password?: string | null;
  roleName?: RoleName;
  username?: string | null;
};

export const findTestRole = async (name: RoleName): Promise<Role> => {
  const role = await dbClient.role.findUnique({ where: { name } });

  if (!role) {
    throw new Error(`Role with the name "${name}" not found!`);
  }

  return role;
};

export const createTestUserDto = ({
  email,
  isEnabled,
  oauthProvider,
  password,
  roleId,
  username = randUserName(),
}: CreateTestUserDtoArgs): CreateUserDto => {
  const dto = new CreateUserDto({
    email: email ?? randEmail(),
    name: randFullName(),
    oauthProvider: oauthProvider ?? 'github',
    password: password ?? null,
    pictureUrl: randImg(),
    roleId,
    timezone: randTimeZone(),
    username,
  });

  dto.isEnabled = Boolean(isEnabled);

  return dto;
};

export const createTestUser = async ({
  email,
  isEnabled,
  oauthProvider,
  password,
  roleName = 'user',
  username,
}: CreateTestUserArgs): Promise<User> => {
  const role = await findTestRole(roleName);

  const createUserDto = createTestUserDto({ email, isEnabled, oauthProvider, password, roleId: role.id, username });

  return dbClient.user.create({ data: createUserDto.toUser() });
};

export const deleteTestUsersById = async (userIds: Array<string | undefined>): Promise<void[]> => {
  const promises = userIds.map(async (userId) => {
    if (!userId) {
      return;
    }

    await dbClient.user.delete({ where: { id: userId } });
  });

  return Promise.all(promises);
};

export const deleteTestFoldersById = async (folderIds: Array<string | undefined>): Promise<void> => {
  for (const folderId of folderIds) {
    if (!folderId) {
      return;
    }

    // eslint-disable-next-line no-await-in-loop
    await dbClient.folder.delete({ where: { id: folderId } });
  }
};

export const createUserWithRootFolder = async (): Promise<[User, Folder]> => {
  const user = await createTestUser({});
  const rootFolder = await dbClient.folder.create({ data: new CreateUserRootFolderDto(user.id).toFolder() });

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

    return dbClient.folder.create({ data: createFolderDto.toFolder() });
  });

  return Promise.all(promises);
};

export const generateTestId = (): string => dbID.generate();

export const createTestFolderDto = (args?: { name?: string; parentId?: string; userId?: string }): CreateFolderDto => {
  return new CreateFolderDto({
    name: args?.name ?? randWord(),
    parentId: args?.parentId ?? generateTestId(),
    userId: args?.userId ?? generateTestId(),
  });
};

export const createTestSnippetDto = (
  args: { folderId?: string; name?: string; userId?: string; visibility?: SnippetVisibility } | undefined,
): CreateSnippetDto => {
  const languages = ['java', 'js', 'ts', 'c', 'c++', 'python', 'go', 'php', 'csharp'];
  const extensions = ['java', 'js', 'ts', 'c', 'cpp', 'py', 'go', 'php', 'cs'];
  const themes = ['one-dark-pro', 'dracula', 'dark-plus', 'monokai', 'github-dark', 'github-light'];

  const languageIndex = randNumber({ max: languages.length - 1, min: 0 });
  const themeIndex = randNumber({ max: themes.length - 1, min: 0 });

  const snippetContent = randWord({ length: randNumber({ max: 30, min: 5 }) }).join('\n');

  return new CreateSnippetDto({
    content: snippetContent,
    contentHighlighted: `${snippetContent} highlighted`,
    description: randWord({ length: randNumber({ max: 20, min: 10 }) }).join(' '),
    folderId: args?.folderId ?? generateTestId(),
    language: languages[languageIndex],
    lineHighlight: null,
    name: args?.name ?? `${randWord()}.${extensions[languageIndex]}`,
    theme: themes[themeIndex],
    userId: args?.userId ?? generateTestId(),
    visibility: args?.visibility ?? 'public',
  });
};

export const deleteTestSnippetsById = async (snippetIds: Array<string | undefined>): Promise<void[]> => {
  const promises = snippetIds.map(async (snippetId) => {
    if (!snippetId) {
      return;
    }

    await dbClient.snippet.delete({ where: { id: snippetId } });
  });

  return Promise.all(promises);
};

export const createTestSnippet = async (
  args: { folderId?: string; name?: string; userId?: string; visibility?: SnippetVisibility } | undefined,
): Promise<Snippet> => {
  const createSnippetDto = createTestSnippetDto(args);

  return dbClient.snippet.create({ data: createSnippetDto.toSnippet() });
};

export const updateTestUserDto = (roleId: string): UpdateUserDto => {
  const providers: OauthProvider[] = ['email', 'google', 'github', 'stackoverflow'];
  const index = randNumber({ max: 2, min: 0 });

  return new UpdateUserDto({
    name: randFullName(),
    oauthProvider: providers[index],
    pictureUrl: randImg(),
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

  return dbClient.session.create({ data: createSessionDto.toSession() });
};

export const deleteTestUserSessions = async (userId: string): Promise<void> => {
  await dbClient.session.deleteMany({ where: { userId } });
};

export const deleteTestSnippetDto = (args: { snippetId: string; userId: string }): DeleteSnippetDto => {
  return new DeleteSnippetDto({
    creatorId: args.userId,
    snippetId: args.snippetId,
  });
};

export const updateTestSnippetDto = (
  args: { name?: string; snippetId?: string; userId?: string; visibility?: SnippetVisibility } | undefined,
): UpdateSnippetDto => {
  const languages = ['java', 'js', 'ts', 'c', 'c++', 'python', 'go', 'php', 'csharp'];
  const extensions = ['java', 'js', 'ts', 'c', 'cpp', 'py', 'go', 'php', 'cs'];
  const themes = ['one-dark-pro', 'dracula', 'dark-plus', 'monokai', 'github-dark', 'github-light'];

  const languageIndex = randNumber({ max: languages.length - 1, min: 0 });
  const themeIndex = randNumber({ max: themes.length - 1, min: 0 });

  const snippetContent = randWord({ length: randNumber({ max: 30, min: 5 }) }).join('\n');

  return new UpdateSnippetDto({
    content: snippetContent,
    contentHighlighted: `${snippetContent} highlighted`,
    creatorId: args?.userId ?? generateTestId(),
    description: randWord({ length: randNumber({ max: 20, min: 10 }) }).join(' '),
    language: languages[languageIndex],
    lineHighlight: null,
    name: args?.name ?? `${randWord()}.${extensions[languageIndex]}`,
    snippetId: args?.snippetId ?? generateTestId(),
    theme: themes[themeIndex],
    visibility: args?.visibility ?? 'public',
  });
};

export const updateTestFolderDto = (
  args: { folderId?: string; name?: string; userId?: string } | undefined,
): UpdateFolderDto => {
  return new UpdateFolderDto({
    creatorId: args?.userId ?? generateTestId(),
    folderId: args?.folderId ?? generateTestId(),
    name: args?.name ?? `${randWord()}`,
  });
};
