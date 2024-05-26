import { AppError, AppErrorCode } from '@snipcode/utils';
import { AxiosError } from 'axios';

export const handleRequestError = (errorCode: AppErrorCode) => (error: AxiosError) => {
  const errorInfo = {
    data: error.response?.data,
    message: error.message,
    status: error.response?.status,
  };

  throw new AppError(JSON.stringify(errorInfo, null, 2), errorCode);
};
