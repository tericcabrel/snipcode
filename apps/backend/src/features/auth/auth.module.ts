import { Module } from '@nestjs/common';

import { AuthResolvers } from './graphql/auth.resolvers';
import { AuthController } from './rest/auth.controller';
import { GithubService } from './services/github.service';

@Module({
  controllers: [AuthController],
  providers: [AuthResolvers, GithubService],
})
export class AuthFeatureModule {}
