export type AppErrorCode =
  | 'INTERNAL_ERROR'
  | 'NEWSLETTER_SUBSCRIBE_FAILED'
  | 'NOT_AUTHENTICATED'
  | 'FOLDER_ALREADY_EXIST'
  | 'FOLDERS_DONT_BELONG_TO_USER'
  | 'SNIPPET_ALREADY_EXIST'
  | 'CANT_DELETE_ROOT_FOLDER'
  | 'USER_ROOT_FOLDER_NOT_FOUND'
  | 'LOGIN_FAILED'
  | 'ROLE_USER_NOT_FOUND'
  | 'EMAIL_ALREADY_TAKEN'
  | 'USERNAME_ALREADY_TAKEN'
  | 'ACCOUNT_DISABLED'
  | 'FOLDER_NOT_FOUND'
  | 'SNIPPET_NOT_FOUND'
  | 'CANT_EDIT_SNIPPET'
  | 'CANT_EDIT_FOLDER'
  | 'CANT_RENAME_ROOT_FOLDER'
  | 'INVALID_CONFIRMATION_TOKEN'
  | 'USER_NOT_FOUND'
  | 'FOLDER_NOT_BELONGING_TO_USER';

export class AppError extends Error {
  constructor(
    public message: string,
    public code: AppErrorCode = 'INTERNAL_ERROR',
  ) {
    super();
  }
}

export const isAppError = (error: unknown): error is AppError => {
  return error instanceof AppError;
};
