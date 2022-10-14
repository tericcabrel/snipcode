import { Snippet } from '@sharingan/database';
import { Lang } from 'shiki';

import { Shiki } from '../types';
import { generateLineHighlightOptions, parseHTMLSnippetCode } from './utils';

export const generateNoSnippetHtmlContent = (webAppUrl: string) => {
  return `<div class="no-content">
            <h3>Oops! Snippet not found!</h3>
            <div>Go to <a href="${webAppUrl}" target="_blank">Sharingan</a> to ensure it exists and is accessible</div>
          </div>`;
};

export const generateSnippetHtmlContent = async ({ shiki, snippet }: { shiki: Shiki; snippet: Snippet }) => {
  const highlighter = await shiki.getHighlighter({
    langs: [snippet.language] as Lang[],
    theme: snippet.theme,
    themes: [snippet.theme],
  });

  const snippetCodeHtml = highlighter.codeToHtml(snippet.content.trim(), {
    lang: snippet.language,
    lineOptions: generateLineHighlightOptions(snippet.lineHighlight),
  });

  const backgroundColor = highlighter.getBackgroundColor();

  const html = parseHTMLSnippetCode(snippetCodeHtml);

  return {
    backgroundColor,
    html,
  };
};
