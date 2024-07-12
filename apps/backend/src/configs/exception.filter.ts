import { ArgumentsHost, Catch } from '@nestjs/common';
import { AbstractHttpAdapter, BaseExceptionFilter } from '@nestjs/core';
import { GqlArgumentsHost, GqlContextType } from '@nestjs/graphql';
import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
  PrismaClientRustPanicError,
  PrismaClientUnknownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library';
import { isAppError } from '@snipcode/utils';
import { Response } from 'express';
import { GraphQLError } from 'graphql';

import { INTERNAL_SERVER_ERROR } from '../utils/constants';

type PrismaError =
  | PrismaClientInitializationError
  | PrismaClientKnownRequestError
  | PrismaClientRustPanicError
  | PrismaClientUnknownRequestError
  | PrismaClientValidationError;

const isPrismaError = (error: unknown): error is PrismaError => {
  return (
    error instanceof PrismaClientInitializationError ||
    error instanceof PrismaClientKnownRequestError ||
    error instanceof PrismaClientRustPanicError ||
    error instanceof PrismaClientUnknownRequestError ||
    error instanceof PrismaClientValidationError
  );
};

@Catch()
export class ApplicationExceptionFilter extends BaseExceptionFilter {
  constructor(httpAdapter: AbstractHttpAdapter) {
    super(httpAdapter);
  }

  catch(exception: unknown, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);

    if (gqlHost.getType<GqlContextType>() === 'graphql') {
      if (isAppError(exception)) {
        throw new GraphQLError(exception.message, {
          extensions: {
            code: exception.code,
          },
          originalError: exception,
        });
      } else if (isPrismaError(exception)) {
        throw new GraphQLError(INTERNAL_SERVER_ERROR, {
          extensions: {
            code: 'DATABASE_ERROR',
          },
        });
      }
    } else {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();

      if (isAppError(exception)) {
        response.status(400).json({
          code: exception.code,
          message: exception.message,
          timestamp: new Date().toISOString(),
        });
      } else if (isPrismaError(exception)) {
        response.status(500).json({
          code: 'DATABASE_ERROR',
          message: INTERNAL_SERVER_ERROR,
          timestamp: new Date().toISOString(),
        });
      }

      super.catch(exception, host);
    }
  }
}
