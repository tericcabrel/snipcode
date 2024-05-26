import { AppErrorCode } from './types';

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
