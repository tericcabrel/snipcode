import { errors } from '@sharingan/utils';

import AppError from './app-error';

const isSharinganError = (error: any) => {
  return 'message' in error && 'code' in error;
};

export const throwApplicationError = (error: any) => {
  if (isSharinganError(error)) {
    throw new AppError(error.message, error.code);
  }

  throw new AppError(errors.INTERNAL_SERVER_ERROR, 'INTERNAL_SERVER_ERROR');
};
