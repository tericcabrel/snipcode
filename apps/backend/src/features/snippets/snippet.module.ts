import { Module } from '@nestjs/common';

import { SnippetResolvers } from './graphql/snippet.resolvers';

@Module({
  providers: [SnippetResolvers],
})
export class SnippetFeatureModule {}
