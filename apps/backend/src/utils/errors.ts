import { GraphQLError } from 'graphql';

export class GraphQLAppError extends GraphQLError {
  constructor(message: string, code: string) {
    const enhancedExtension: Record<string, any> = {
      extensions: { code },
    };

    super(message, enhancedExtension);
  }
}
