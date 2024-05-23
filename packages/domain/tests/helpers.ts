import { randEmail, randFullName, randImg, randNumber, randTimeZone, randUserName, randWord } from '@ngneat/falso';

import { Folder } from '../src/services/folders/folder.entity';
import { CreateFolderInput } from '../src/services/folders/inputs/create-folder-input';
import { CreateUserRootFolderInput } from '../src/services/folders/inputs/create-user-root-folder-input';
import { UpdateFolderInput } from '../src/services/folders/inputs/update-folder-input';
import { PrismaService } from '../src/services/prisma.service';
import { Role, RoleName } from '../src/services/roles/role.entity';
import { CreateSessionInput } from '../src/services/sessions/inputs/create-session-input';
import { Session } from '../src/services/sessions/session.entity';
import { CreateSnippetInput } from '../src/services/snippets/inputs/create-snippet-input';
import { DeleteSnippetInput } from '../src/services/snippets/inputs/delete-snippet-input';
import { UpdateSnippetInput } from '../src/services/snippets/inputs/update-snippet-input';
import { Snippet, SnippetVisibility } from '../src/services/snippets/snippet.entity';
import { CreateUserInput } from '../src/services/users/inputs/create-user-input';
import { UpdateUserInput } from '../src/services/users/inputs/update-user-input';
import { OauthProvider, User } from '../src/services/users/user.entity';
import { dbID } from '../src/utils/db-id';

type CreateManyTestFoldersArgs = {
  folderNames: string[];
  parentId: string;
  userId: string;
};

type CreateTestUserInputArgs = {
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

export class TestHelper {
  constructor(private readonly prisma: PrismaService) {}

  static generateTestId(): string {
    return dbID.generate();
  }

  async findTestRole(name: RoleName): Promise<Role> {
    const role = await this.prisma.role.findUnique({ where: { name } });

    if (!role) {
      throw new Error(`Role with the name "${name}" not found!`);
    }

    return role;
  }

  static createTestUserInput({
    email,
    isEnabled,
    oauthProvider,
    password,
    roleId,
    username = randUserName(),
  }: CreateTestUserInputArgs): CreateUserInput {
    const input = new CreateUserInput({
      email: email ?? randEmail(),
      name: randFullName(),
      oauthProvider: oauthProvider ?? 'github',
      password: password ?? null,
      pictureUrl: randImg(),
      roleId,
      timezone: randTimeZone(),
      username,
    });

    input.isEnabled = Boolean(isEnabled);

    return input;
  }

  async createTestUser({
    email,
    isEnabled,
    oauthProvider,
    password,
    roleName = 'user',
    username,
  }: CreateTestUserArgs): Promise<User> {
    const role = await this.findTestRole(roleName);

    const createUserInput = TestHelper.createTestUserInput({
      email,
      isEnabled,
      oauthProvider,
      password,
      roleId: role.id,
      username,
    });

    return this.prisma.user.create({ data: createUserInput.toUser() });
  }

  async deleteTestUsersById(userIds: Array<string | undefined>): Promise<void[]> {
    const promises = userIds.map(async (userId) => {
      if (!userId) {
        return;
      }

      await this.prisma.user.delete({ where: { id: userId } });
    });

    return Promise.all(promises);
  }

  static updateTestUserInput(roleId: string): UpdateUserInput {
    const providers: OauthProvider[] = ['email', 'google', 'github', 'stackoverflow'];
    const index = randNumber({ max: 2, min: 0 });

    return new UpdateUserInput({
      name: randFullName(),
      oauthProvider: providers[index],
      pictureUrl: randImg(),
      roleId,
      timezone: randTimeZone(),
    });
  }

  async deleteTestFoldersById(folderIds: Array<string | undefined>): Promise<void> {
    for (const folderId of folderIds) {
      if (!folderId) {
        return;
      }

      // eslint-disable-next-line no-await-in-loop
      await this.prisma.folder.delete({ where: { id: folderId } });
    }
  }

  async createUserWithRootFolder(): Promise<[User, Folder]> {
    const user = await this.createTestUser({});
    const rootFolder = await this.prisma.folder.create({ data: new CreateUserRootFolderInput(user.id).toFolder() });

    return [user, rootFolder];
  }

  async createManyTestFolders({ folderNames, parentId, userId }: CreateManyTestFoldersArgs): Promise<Folder[]> {
    const promises = folderNames.map((name) => {
      const createFolderInput = new CreateFolderInput({
        name,
        parentId,
        userId,
      });

      return this.prisma.folder.create({ data: createFolderInput.toFolder() });
    });

    return Promise.all(promises);
  }

  static createTestFolderInput(args?: { name?: string; parentId?: string; userId?: string }): CreateFolderInput {
    return new CreateFolderInput({
      name: args?.name ?? randWord(),
      parentId: args?.parentId ?? TestHelper.generateTestId(),
      userId: args?.userId ?? TestHelper.generateTestId(),
    });
  }

  static updateTestFolderInput(
    args: { folderId?: string; name?: string; userId?: string } | undefined,
  ): UpdateFolderInput {
    return new UpdateFolderInput({
      creatorId: args?.userId ?? TestHelper.generateTestId(),
      folderId: args?.folderId ?? TestHelper.generateTestId(),
      name: args?.name ?? `${randWord()}`,
    });
  }

  static createTestSnippetInput(
    args: { folderId?: string; name?: string; userId?: string; visibility?: SnippetVisibility } | undefined,
  ): CreateSnippetInput {
    const languages = ['java', 'js', 'ts', 'c', 'c++', 'python', 'go', 'php', 'csharp'];
    const extensions = ['java', 'js', 'ts', 'c', 'cpp', 'py', 'go', 'php', 'cs'];
    const themes = ['one-dark-pro', 'dracula', 'dark-plus', 'monokai', 'github-dark', 'github-light'];

    const languageIndex = randNumber({ max: languages.length - 1, min: 0 });
    const themeIndex = randNumber({ max: themes.length - 1, min: 0 });

    const snippetContent = randWord({ length: randNumber({ max: 30, min: 5 }) }).join('\n');

    return new CreateSnippetInput({
      content: snippetContent,
      contentHighlighted: `${snippetContent} highlighted`,
      description: randWord({ length: randNumber({ max: 20, min: 10 }) }).join(' '),
      folderId: args?.folderId ?? TestHelper.generateTestId(),
      language: languages[languageIndex],
      lineHighlight: null,
      name: args?.name ?? `${randWord()}.${extensions[languageIndex]}`,
      theme: themes[themeIndex],
      userId: args?.userId ?? TestHelper.generateTestId(),
      visibility: args?.visibility ?? 'public',
    });
  }

  async deleteTestSnippetsById(snippetIds: Array<string | undefined>): Promise<void[]> {
    const promises = snippetIds.map(async (snippetId) => {
      if (!snippetId) {
        return;
      }

      await this.prisma.snippet.delete({ where: { id: snippetId } });
    });

    return Promise.all(promises);
  }

  async createTestSnippet(
    args: { folderId?: string; name?: string; userId?: string; visibility?: SnippetVisibility } | undefined,
  ): Promise<Snippet> {
    const createSnippetInput = TestHelper.createTestSnippetInput(args);

    return this.prisma.snippet.create({ data: createSnippetInput.toSnippet() });
  }

  static updateTestSnippetInput(
    args: { name?: string; snippetId?: string; userId?: string; visibility?: SnippetVisibility } | undefined,
  ): UpdateSnippetInput {
    const languages = ['java', 'js', 'ts', 'c', 'c++', 'python', 'go', 'php', 'csharp'];
    const extensions = ['java', 'js', 'ts', 'c', 'cpp', 'py', 'go', 'php', 'cs'];
    const themes = ['one-dark-pro', 'dracula', 'dark-plus', 'monokai', 'github-dark', 'github-light'];

    const languageIndex = randNumber({ max: languages.length - 1, min: 0 });
    const themeIndex = randNumber({ max: themes.length - 1, min: 0 });

    const snippetContent = randWord({ length: randNumber({ max: 30, min: 5 }) }).join('\n');

    return new UpdateSnippetInput({
      content: snippetContent,
      contentHighlighted: `${snippetContent} highlighted`,
      creatorId: args?.userId ?? TestHelper.generateTestId(),
      description: randWord({ length: randNumber({ max: 20, min: 10 }) }).join(' '),
      language: languages[languageIndex],
      lineHighlight: null,
      name: args?.name ?? `${randWord()}.${extensions[languageIndex]}`,
      snippetId: args?.snippetId ?? TestHelper.generateTestId(),
      theme: themes[themeIndex],
      visibility: args?.visibility ?? 'public',
    });
  }

  static deleteTestSnippetInput(args: { snippetId: string; userId: string }): DeleteSnippetInput {
    return new DeleteSnippetInput({
      creatorId: args.userId,
      snippetId: args.snippetId,
    });
  }

  static createTestSessionInput(userId: string): CreateSessionInput {
    return new CreateSessionInput({
      expireDate: new Date(),
      userId,
    });
  }

  async createTestSession(args: { userId: string }): Promise<Session> {
    const createSessionInput = TestHelper.createTestSessionInput(args.userId);

    return this.prisma.session.create({ data: createSessionInput.toSession() });
  }

  async deleteTestUserSessions(userId: string): Promise<void> {
    await this.prisma.session.deleteMany({ where: { userId } });
  }
}
