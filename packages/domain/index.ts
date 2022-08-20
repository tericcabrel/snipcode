import CreateFolderDto from './src/folders/dtos/create-folder-dto';
import CreateUserRootFolderDto from './src/folders/dtos/create-user-root-folder-dto';
import FolderService from './src/folders/folder.service';
import NewsletterService from './src/newsletters/newsletter.service';
import CreateRoleDto from './src/roles/dtos/create-role-dto';
import RoleService from './src/roles/role.service';
import CreateSessionDto from './src/sessions/dtos/create-session-dto';
import SessionService from './src/sessions/session.service';
import CreateSnippetDto from './src/snippets/dtos/create-snippet-dto';
import UpdateSnippetDto from './src/snippets/dtos/update-snippet-dto';
import SnippetService from './src/snippets/snippet.service';
import CreateUserDto from './src/users/dtos/create-user-dto';
import UpdateUserDto from './src/users/dtos/update-user-dto';
import UserService from './src/users/user.service';

const roleService = new RoleService();
const userService = new UserService();
const folderService = new FolderService();
const snippetService = new SnippetService();
const sessionService = new SessionService();

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
  UpdateSnippetDto,
};
export type { RoleService, UserService, FolderService, SessionService, SnippetService };
