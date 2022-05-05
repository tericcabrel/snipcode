import { ApolloError } from 'apollo-server-core';

export default class AppError extends ApolloError {
  constructor(message: string, code: string, extensions?: Record<string, any>) {
    super(message, code, extensions);
  }
}
