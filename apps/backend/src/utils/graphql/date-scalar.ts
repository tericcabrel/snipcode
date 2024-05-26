import { CustomScalar, Scalar } from '@nestjs/graphql';
import { errors } from '@snipcode/utils';
import { Kind, ValueNode } from 'graphql';
import { GraphQLError } from 'graphql';

import { DATE_REGEX } from '../constants';

@Scalar('Date')
export class DateScalar implements CustomScalar<number, Date> {
  description = 'Date custom scalar type';
  name = 'Date';

  parseValue(value: unknown) {
    return new Date(value as string); // Convert incoming integer to Date
  }

  serialize(value: unknown) {
    return (value as Date).getTime(); // Convert outgoing Date to integer for JSON
  }

  parseLiteral(ast: ValueNode): Date {
    if (ast.kind === Kind.STRING) {
      if (!DATE_REGEX.test(ast.value)) {
        throw new GraphQLError(errors.INVALID_DATE_TYPE, {
          extensions: {
            code: 'INVALID_DATE_TYPE',
          },
        });
      }

      return new Date(`${ast.value}T01:00:00`);
    }

    if (ast.kind === Kind.INT) {
      return new Date(ast.value);
    }

    throw new GraphQLError(errors.INVALID_DATE_TYPE, {
      extensions: {
        code: 'INVALID_DATE_TYPE',
      },
    });
  }
}
