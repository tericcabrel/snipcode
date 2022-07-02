import {
  FolderRepository,
  RoleRepository,
  SessionRepository,
  SnippetRepository,
  UserRepository,
} from '@sharingan/database';

import CreateFolderDto from './src/folders/dtos/create-folder-dto';
import CreateUserRootFolderDto from './src/folders/dtos/create-user-root-folder-dto';
import FolderService from './src/folders/folder.service';
import NewsletterService from './src/newsletters/newsletter.service';
import CreateRoleDto from './src/roles/dtos/create-role-dto';
import RoleService from './src/roles/role.service';
import CreateSessionDto from './src/sessions/dtos/create-session-dto';
import SessionService from './src/sessions/session.service';
import CreateSnippetDto from './src/snippets/dtos/create-snippet-dto';
import SnippetService from './src/snippets/snippet.service';
import CreateUserDto from './src/users/dtos/create-user-dto';
import UpdateUserDto from './src/users/dtos/update-user-dto';
import UserService from './src/users/user.service';

const roleService = new RoleService(new RoleRepository());
const userService = new UserService(new UserRepository(), new FolderRepository());
const folderService = new FolderService(new FolderRepository());
const snippetService = new SnippetService(new SnippetRepository());
const sessionService = new SessionService(new SessionRepository());

export {
  folderService,
  roleService,
  sessionService,
  snippetService,
  userService,
  CreateRoleDto,
  CreateSessionDto,
  CreateUserDto,
  UpdateUserDto,
  CreateFolderDto,
  CreateSnippetDto,
  CreateUserRootFolderDto,
  NewsletterService,
};
export type { RoleService, UserService, FolderService, SessionService, SnippetService };
