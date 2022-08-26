import { dbClient } from '@sharingan/database';
import { renderSnippetToHtml } from '@sharingan/embed';
import { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from 'aws-lambda';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const shiki = require('shiki');

export const main: Handler<APIGatewayProxyEvent, APIGatewayProxyResult> = async (event) => {
  const snippetId = event.pathParameters['id'];

  const snippet = await dbClient.snippet.findFirst({ where: { id: snippetId, visibility: 'public' } });

  const content = await renderSnippetToHtml({
    options: {
      scriptUrl: process.env.EMBED_JS_URL,
      styleUrl: process.env.EMBED_STYLE_URL,
    },
    shiki,
    snippet,
  });

  return {
    body: content,
    statusCode: 200,
  };
};
