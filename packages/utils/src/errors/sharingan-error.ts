import { ErrorCode } from './types';

export default class SharinganError extends Error {
  constructor(public message: string, public code: ErrorCode = 'INTERNAL_ERROR') {
    super();
  }
}
