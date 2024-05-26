import { Module } from '@nestjs/common';

import { AuthResolvers } from './graphql/auth.resolvers';
import { AuthController } from './rest/auth.controller';
import { GithubService } from './services/github.service';

@Module({
  providers: [AuthResolvers, GithubService, AuthController],
})
export class AuthFeatureModule {}
