import { Module } from '@nestjs/common';

import { UserResolvers } from './graphql/user.resolvers';

@Module({
  providers: [UserResolvers],
})
export class UserFeatureModule {}
