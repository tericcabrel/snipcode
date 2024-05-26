import { join } from 'path';

import { GraphQLDefinitionsFactory } from '@nestjs/graphql';

const definitionsFactory = new GraphQLDefinitionsFactory();

void definitionsFactory.generate({
  defaultScalarType: 'unknown',
  emitTypenameField: true,
  enumsAsTypes: true,
  outputAs: 'interface',
  path: join(process.cwd(), 'src/types/graphql.schema.ts'),
  typePaths: ['./src/features/**/*.graphql'],
});
