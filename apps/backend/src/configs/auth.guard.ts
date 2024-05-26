import { CanActivate, ExecutionContext, Injectable, UnauthorizedException, createParamDecorator } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { SessionService } from '@snipcode/domain';
import { errors } from '@snipcode/utils';

import { GraphQLContext } from '../types/common';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private sessionService: SessionService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext<GraphQLContext>().req;

    const token = request.headers.authorization;

    if (!token) {
      throw new UnauthorizedException(errors.NOT_AUTHENTICATED);
    }

    const session = await this.sessionService.findByToken(token);

    if (!session) {
      throw new UnauthorizedException(errors.NOT_AUTHENTICATED);
    }

    request['userId'] = session.userId;

    return true;
  }
}

export const UserId = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => GqlExecutionContext.create(ctx).getContext<GraphQLContext>().req.userId,
);
