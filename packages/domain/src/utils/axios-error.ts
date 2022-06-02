import SharinganError, { ErrorCode } from '@sharingan/utils';
import { AxiosError } from 'axios';

export const handleRequestError = (errorCode: ErrorCode) => (error: AxiosError) => {
  const errorInfo = {
    data: error.response?.data,
    message: error.message,
    status: error.response?.status,
  };

  throw new SharinganError(JSON.stringify(errorInfo, null, 2), errorCode);
};
