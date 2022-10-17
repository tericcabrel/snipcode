import { Snippet } from '@sharingan/database';

import { generateNoSnippetHtmlContent, generateSnippetHtmlContent } from './content/html-generator';
import { generateHTMLPreview } from './content/preview-template';
import { Shiki } from './types';

type Args = {
  options: {
    scriptUrl: string;
    styleUrl: string;
    webAppUrl: string;
    webAppViewUrl: string;
  };
  shiki: Shiki;
  snippet: Snippet | null;
};

export const renderSnippetToHtml = async ({ options, shiki, snippet }: Args): Promise<string> => {
  const STYLE_URL = options.styleUrl;
  const SCRIPT_URL = options.scriptUrl;
  const WEBAPP_URL = options.webAppUrl;
  const WEBAPP_VIEW_URL = options.webAppViewUrl;

  if (!snippet) {
    const code = generateNoSnippetHtmlContent(WEBAPP_URL);

    return generateHTMLPreview({
      code,
      rawCode: '',
      scriptUrl: SCRIPT_URL,
      styleUrl: STYLE_URL,
      title: 'Not found',
      webAppUrl: WEBAPP_URL,
    });
  }

  const { backgroundColor, html } = await generateSnippetHtmlContent({ shiki, snippet });

  return generateHTMLPreview({
    code: html,
    color: backgroundColor,
    rawCode: snippet.content,
    scriptUrl: SCRIPT_URL,
    styleUrl: STYLE_URL,
    title: snippet.name,
    webAppUrl: `${WEBAPP_VIEW_URL}/${snippet.id}`,
  });
};
