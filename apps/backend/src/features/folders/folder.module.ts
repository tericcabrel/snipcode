import { Module } from '@nestjs/common';

import { FolderResolvers } from './graphql/folder.resolvers';

@Module({
  providers: [FolderResolvers],
})
export class FolderFeatureModule {}
