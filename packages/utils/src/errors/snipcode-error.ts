import { ErrorCode } from './types';

export default class SnipcodeError extends Error {
  constructor(
    public message: string,
    public code: ErrorCode = 'INTERNAL_ERROR',
  ) {
    super();
  }
}
