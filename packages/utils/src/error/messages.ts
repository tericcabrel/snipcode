export const NEWSLETTER_SUBSCRIBE_FAILED = 'Failed to subscribe to the newsletter.';
export const NOT_AUTHENTICATED = 'You must be authenticated to access to this resource.';
export const FOLDER_ALREADY_EXIST = (folderName: string) => `A folder named "${folderName}" already exists`;
export const FOLDERS_DONT_BELONG_TO_USER = "One or may folders don't belong to the current user";
export const CANT_DELETE_ROOT_FOLDER = 'The root folder cannot be deleted.';
export const SNIPPET_ALREADY_EXIST = (snippetName: string) => `A snippet named "${snippetName}" already exists`;
export const INTERNAL_SERVER_ERROR = 'Internal server error';
export const INVALID_DATE_TYPE_CODE = 'INVALID_TYPE';
export const INVALID_DATE_TYPE = 'The date format must be YYYY-MM-DD';
export const ROLE_USER_NOT_FOUND = 'Role user not found';
export const USER_ROOT_FOLDER_NOT_FOUND = (userId: string) => `The root folder of the user "${userId}" not found`;
export const LOGIN_FAILED = 'Invalid email address or password.';
export const EMAIL_ALREADY_TAKEN = 'The email address is already taken';
export const USERNAME_ALREADY_TAKEN = 'The username is already taken';
export const ACCOUNT_DISABLED = 'Your account is disabled!';
export const FOLDER_NOT_FOUND = (folderId: string) => `The folder with the id "${folderId}" not found`;
export const SNIPPET_NOT_FOUND = (snippetId: string) => `The folder with the id "${snippetId}" not found`;
export const CANT_EDIT_SNIPPET = (userId: string, snippetId: string) =>
  `The user with id "${userId}" cannot edit the snippet "${snippetId}"`;
export const CANT_EDIT_FOLDER = (userId: string, folderId: string) =>
  `The user with id "${userId}" cannot edit the folder "${folderId}"`;
export const CANT_RENAME_ROOT_FOLDER = 'The root folder cannot be renamed.';
export const INVALID_CONFIRMATION_TOKEN = 'Invalid confirmation token';
export const USER_NOT_FOUND_FROM_TOKEN = 'No user associated with this token';
