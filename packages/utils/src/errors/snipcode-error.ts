import { ErrorCode } from './types';

export class SnipcodeError extends Error {
  constructor(
    public message: string,
    public code: ErrorCode = 'INTERNAL_ERROR',
  ) {
    super();
  }
}
