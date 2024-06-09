import { ArgumentsHost, Catch } from '@nestjs/common';
import { AbstractHttpAdapter, BaseExceptionFilter } from '@nestjs/core';
import { GqlArgumentsHost, GqlContextType } from '@nestjs/graphql';
import { isAppError } from '@snipcode/utils';
import { Response } from 'express';
import { GraphQLError } from 'graphql';

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
      }
    } else {
      if (isAppError(exception)) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        response.status(400).json({
          code: exception.code,
          message: exception.message,
          timestamp: new Date().toISOString(),
        });
      }
      super.catch(exception, host);
    }
  }
}
