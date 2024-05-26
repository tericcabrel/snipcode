import { Module } from '@nestjs/common';

import { AuthResolvers } from './graphql/auth.resolvers';

@Module({
  providers: [AuthResolvers],
})
export class AuthFeatureModule {}
