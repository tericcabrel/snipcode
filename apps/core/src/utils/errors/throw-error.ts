import SharinganError, { errors } from '@sharingan/utils';

import AppError from './app-error';

export const throwApplicationError = (error: any) => {
  if (error instanceof SharinganError) {
    throw new AppError(error.message, error.code);
  }

  throw new AppError(errors.INTERNAL_SERVER_ERROR, 'INTERNAL_SERVER_ERROR');
};
