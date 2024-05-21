import { dbClient } from '@snipcode/domain';
import { renderSnippetToHtml } from '@snipcode/embed';
import { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from 'aws-lambda';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const shiki = require('shiki');

const findSnippet = async (id?: string | null) => {
  if (!id) {
    return null;
  }

  return dbClient.snippet.findFirst({
    where: {
      id,
      visibility: 'public',
    },
  });
};

export const main: Handler<APIGatewayProxyEvent, APIGatewayProxyResult> = async (event) => {
  const snippetId = event.pathParameters ? event.pathParameters['id'] : null;

  const snippet = await findSnippet(snippetId);

  const content = await renderSnippetToHtml({
    options: {
      scriptUrl: process.env.EMBED_JS_URL,
      styleUrl: process.env.EMBED_STYLE_URL,
      webAppUrl: process.env.WEB_APP_URL,
      webAppViewUrl: process.env.WEB_APP_SNIPPET_VIEW_URL,
    },
    shiki,
    snippet,
  });

  return {
    body: content,
    headers: {
      'Content-Type': 'text/html',
    },
    statusCode: 200,
  };
};
