import { Module } from '@nestjs/common';

import { SnippetResolvers } from './graphql/snippet.resolvers';
import { SnippetController } from './rest/snippet.controller';

@Module({
  providers: [SnippetResolvers, SnippetController],
})
export class SnippetFeatureModule {}
