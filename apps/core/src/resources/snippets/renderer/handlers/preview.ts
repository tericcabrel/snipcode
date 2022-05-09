import { snippetService } from '@sharingan/domain';
import { Response } from 'express';

import { ExpressRequestParams } from '../../../../types/common';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const shiki = require('shiki');

const generateHtmlPreview = (code: string, title: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="robots" content="noindex,nofollow">
    <title>Sharingan - ${title}</title>
    <style>
        .sharingan-container {
          width: 700px;
          margin: 10px auto;
          border: solid 1px #22272e;
          border-radius: 3px;
          background-color: #22272e;
          overflow-x: auto;
          padding-top: 5px;
          padding-bottom: 5px;
        }
        pre {
          margin: 0;
        }
        code {
          counter-reset: step;
          counter-increment: step 0;
        }
        code .line {
          width: 100%;
          display: inline-block;
        }
        code .line::before {
          content: counter(step);
          counter-increment: step;
          width: 1rem;
          margin-right: 1rem;
          display: inline-block;
          text-align: right;
          color: rgba(115,138,148,.4)
        }
        code .line-delete {
          background-color: rgba(229,83,75,0.15);
        }
        code .line-add {
          background-color: rgba(87,171,90,0.3);
        }
        code .line-focus {
          background-color: #475569;
        }
        code .line-blur {
          filter: blur(4px);
        }
    </style>
</head>
<body>
    <div class="sharingan-container">
      ${code}
    </div>
</body>
</html>
`;

export const previewSnippet = async (req: ExpressRequestParams<{ id: string }>, res: Response) => {
  const { id } = req.params;

  const snippet = await snippetService.findById(id);

  if (!snippet) {
    const code = 'No content';
    const page = generateHtmlPreview(code, 'Not found');

    return res.send(page).header('Accept', 'text/html');
  }

  const code = snippet.content.trim();

  const highlighter = await shiki.getHighlighter({
    langs: ['java'],
    theme: 'github-dark-dimmed',
    themes: ['github-dark-dimmed'],
  });

  const html = highlighter.codeToHtml(code, {
    lang: 'java',
    lineOptions: [
      { classes: ['line-add'], line: 1 },
      { classes: ['line-delete'], line: 3 },
      { classes: ['line-focus'], line: 5 },
      { classes: ['line-blur'], line: 7 },
      { classes: ['line-blur'], line: 8 },
      { classes: ['line-blur'], line: 9 },
    ],
  });
  const page = generateHtmlPreview(html, snippet.name);

  res.writeHead(200, { 'Content-Type': 'text/html' });

  return res.end(page);
};
