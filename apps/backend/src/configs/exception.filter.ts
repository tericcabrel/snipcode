import { ArgumentsHost, Catch } from '@nestjs/common';
import { AbstractHttpAdapter, BaseExceptionFilter } from '@nestjs/core';
import { GqlArgumentsHost, GqlContextType } from '@nestjs/graphql';
import { isAppError } from '@snipcode/utils';
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
      // Handle HTTP exceptions
      super.catch(exception, host);
    }
  }
}
