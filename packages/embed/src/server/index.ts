import http from 'http';
import path from 'path';

import { dbClient } from '@sharingan/database';
import dotenv from 'dotenv';
import express from 'express';

import { renderSnippetToHtml } from '../renderer';

dotenv.config({ override: true });

// eslint-disable-next-line @typescript-eslint/no-var-requires
const shiki = require('shiki');

const PORT = 7502;

export const startServer = async () => {
  const app = express();

  const httpServer = http.createServer(app);

  const router = express.Router();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use('/', router);

  app.get('/snippets/:id', async (req, res) => {
    const snippetId = req.params.id;

    const snippet = await dbClient.snippet.findFirst({ where: { id: snippetId, visibility: 'public' } });

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

    res.writeHead(200, { 'Content-Type': 'text/html' });

    return res.end(content);
  });

  app.use(express.static(path.resolve(__dirname, 'public')));

  httpServer.listen(PORT, async () => {
    await dbClient.$connect();

    console.log(`🚀 Server ready at http://localhost:7502`);
  });
};

void (async () => {
  await startServer();
})();
