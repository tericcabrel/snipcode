import { ApolloError } from 'apollo-server-express';
import { GraphQLScalarType, Kind } from 'graphql';

import { DATE_REGEX, INVALID_DATE_TYPE_CODE, INVALID_DATE_TYPE_MESSAGE } from '../../utils/constants';

export const dateScalar = new GraphQLScalarType({
  description: 'Date custom scalar type',
  name: 'Date',
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      if (!DATE_REGEX.test(ast.value)) {
        throw new ApolloError(INVALID_DATE_TYPE_MESSAGE, INVALID_DATE_TYPE_CODE);
      }

      return new Date(`${ast.value}T01:00:00`);
    }

    throw new ApolloError(INVALID_DATE_TYPE_MESSAGE, INVALID_DATE_TYPE_CODE);
  },
  parseValue(value: unknown) {
    return new Date(value as string); // Convert incoming integer to Date
  },
  serialize(value: unknown) {
    return (value as Date).getTime(); // Convert outgoing Date to integer for JSON
  },
});
