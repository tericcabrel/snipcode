import { ErrorCode, SnipcodeError } from '@snipcode/utils';
import { AxiosError } from 'axios';

export const handleRequestError = (errorCode: ErrorCode) => (error: AxiosError) => {
  const errorInfo = {
    data: error.response?.data,
    message: error.message,
    status: error.response?.status,
  };

  throw new SnipcodeError(JSON.stringify(errorInfo, null, 2), errorCode);
};
