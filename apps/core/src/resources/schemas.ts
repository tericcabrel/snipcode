import { mergeTypeDefs } from '@graphql-tools/merge';

import folderSchema from './folders/schema.graphql';
import newsletterSchema from './newsletter/schema.graphql';
import mainSchema from './schema.graphql';
import snippetSchema from './snippets/schema.graphql';
import userSchema from './users/schema.graphql';

const typeDefsArray = [mainSchema, folderSchema, newsletterSchema, snippetSchema, userSchema];

export default mergeTypeDefs(typeDefsArray);
