import { snippetService } from '@sharingan/domain';
import { Response } from 'express';

import { ExpressRequestParams } from '../../../../types/common';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const shiki = require('shiki');

const DEFAULT_COLOR = '#22272e';

const generateHtmlPreview = (code: string, title: string, color: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="robots" content="noindex,nofollow">
    <title>Sharingan New - ${title}</title>
    <style>
        .ctner {
          width: 100%;
          margin: 0 auto;
          position: relative;
        }
        .ctner-header {
          background-color: #e5e7eb;
          display: flex;
          justify-content: space-between;
          color: rgb(17 24 39);
          font-family: 'Inter', monospace !important;
          font-size: 14px;
          padding: 10px;
          border-radius: 3px 3px 0 0;
        }
        .ctner-header a {
          text-decoration: none;
          color: rgb(17 24 39);
          font-weight: bold;
        }
        .code-editor-container {
          border: solid 1px ${color};
          border-radius: 0 0 3px 3px;
          background-color: ${color};
          overflow-x: auto;
          padding-top: 5px;
          padding-bottom: 5px;
          position: relative;
          font-size: 14px;
        }
        .code-editor-container {
          counter-reset: line;
        }
        .code-editor-container pre {
          padding-left: 50px !important;
          white-space: pre !important;
        }
        .code-editor-container code {
          font-family: 'Inter', monospace !important;
          font-size: 14px;
        }
        .code-editor-container code .line {
          padding-right: 10px;
        }
        .code-editor-container .line-number {
          position: absolute;
          left: 0;
          color: #cccccc;
          text-align: right;
          width: 30px;
          font-size: 12px;
          height: 18px;
          overflow: hidden;
          padding-top: 2px;
        }
        .code-editor-container code .line-diff {
          width: 100vw;
          display: inline-block;
        }
        .code-editor-container code .line-diff-delete {
          background-color: rgba(229,83,75,0.15);
        }
        .code-editor-container code .line-diff-add {
          background-color: rgba(87,171,90,0.3);
        }
        .code-editor-container code .line-diff-current {
          background-color: #475569;
        }
        .code-editor-container code .line-diff-blur {
          filter: blur(4px);
        }
        .ic {
          width: 1.5rem;
          height: 1.5rem;
        }
        #btn-copy {
          position: fixed;
          top: 60px;
          right: 20px;
          background-color: rgba(0, 0, 0, 0.25);
          border: 1px solid darkgrey;
          cursor: pointer;
          padding: 5px;
          border-radius: 5px;
        }
        .hidden {
          display: none;
        }
    </style>
</head>
<body>
    <div class="ctner">
      <div class="ctner-header">
        <div>${title}</div>
        <div>view on <a href="">Sharingan</a></div>
      </div>
      <div class="code-editor-container">
        <button id="btn-copy">
          <svg class="ic" id="ic-copy" fill="none" stroke="#fff" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
          </svg>
          <svg class="ic hidden" id="ic-copied" fill="none" stroke="#10B981" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </button>
        <pre>${code}</pre>
      </div>
    </div>
</body>
</html>
`;

const addWhitespaceForEmptyLine = (line: string) => {
  if (/<span class="line (line-diff-?[a-z ]*)*"><\/span>/.test(line)) {
    const [openingBracket] = line.split('</span>');

    return `${openingBracket}&nbsp;&nbsp;</span>`;
  }

  return line;
};

const extractColor = (code: string) => {
  const matches = code.match(/<pre class="shiki" style="background-color: \#[\w]{6}">/);

  if (!matches || matches.length === 0) {
    return DEFAULT_COLOR;
  }

  const [firstMatch] = matches;

  const colorMatches = firstMatch.match(/\#[\w]{6}/);

  if (!colorMatches || colorMatches.length === 0) {
    return DEFAULT_COLOR;
  }

  return colorMatches[0];
};

export const previewSnippet = async (req: ExpressRequestParams<{ id: string }>, res: Response) => {
  const { id } = req.params;

  const snippet = await snippetService.findById(id);

  if (!snippet) {
    const code = 'No content';
    const page = generateHtmlPreview(code, 'Not found', DEFAULT_COLOR);

    return res.send(page).header('Accept', 'text/html');
  }

  const code = snippet.content.trim();

  const highlighter = await shiki.getHighlighter({
    langs: [snippet.language],
    theme: snippet.theme,
    themes: [snippet.theme],
  });

  const lineHighlight = (snippet.lineHighlight ? JSON.parse(snippet.lineHighlight) : []) as Array<[number, string]>;

  const snippetCodeHtml = highlighter.codeToHtml(code, {
    lang: snippet.language,
    lineOptions: lineHighlight.map(([key, value]) => ({ classes: [`line-diff line-diff-${value}`], line: key })),
  });

  const color = extractColor(snippetCodeHtml);

  const html = snippetCodeHtml
    .replace(/<pre class="shiki" style="background-color: \#[\w]{6}">/, '')
    .replace('</pre>', '')
    .split('\n')
    .map((line: string, i: number) => {
      return `<span class='line-number'>${i + 1}</span>${addWhitespaceForEmptyLine(line)}`;
    })
    .join('\n');

  const page = generateHtmlPreview(html, snippet.name, color);

  res.writeHead(200, { 'Content-Type': 'text/html' });

  return res.end(page);
};
