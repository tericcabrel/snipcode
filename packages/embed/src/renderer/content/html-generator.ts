import { Snippet } from '@sharingan/database';
import { Lang } from 'shiki';

import { Shiki } from '../types';
import { addWhitespaceForEmptyLine, generateLineHighlightOptions } from './utils';

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

  const html = snippetCodeHtml
    .replace(/<pre class="shiki" style="background-color: \#[\w]{6}">/, '')
    .replace('</pre>', '')
    .split('\n')
    .map((line: string, i: number) => {
      return `<span class='line-number'>${i + 1}</span>${addWhitespaceForEmptyLine(line)}`;
    })
    .join('\n');

  return {
    backgroundColor,
    html,
  };
};
