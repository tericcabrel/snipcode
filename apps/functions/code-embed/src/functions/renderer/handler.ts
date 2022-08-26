import { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from 'aws-lambda';

export const main: Handler<APIGatewayProxyEvent, APIGatewayProxyResult> = async (event) => {
  const snippetId = event.pathParameters['id'];

  return {
    body: snippetId,
    statusCode: 200,
  };
};
