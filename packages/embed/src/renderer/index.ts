import { Snippet } from '@sharingan/database';
import { Highlighter, HighlighterOptions, Lang } from 'shiki';

import { generateHtmlPreview } from './html-preview';
import { addWhitespaceForEmptyLine, generateLineHighlightOptions } from './utils';

type Shiki = {
  getHighlighter: (options: HighlighterOptions) => Promise<Highlighter>;
};

type Args = {
  options: {
    scriptUrl: string;
    styleUrl: string;
  };
  shiki: Shiki;
  snippet: Snippet | null;
};

export const renderSnippetToHtml = async ({ options, shiki, snippet }: Args): Promise<string> => {
  const STYLE_URL = options.styleUrl;
  const SCRIPT_URL = options.scriptUrl;

  if (!snippet) {
    const code = 'No content';

    return generateHtmlPreview({
      code,
      rawCode: 'No content',
      scriptUrl: SCRIPT_URL,
      styleUrl: STYLE_URL,
      title: 'Not found',
    });
  }

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

  return generateHtmlPreview({
    code: html,
    color: backgroundColor,
    rawCode: snippet.content,
    scriptUrl: SCRIPT_URL,
    styleUrl: STYLE_URL,
    title: snippet.name,
  });
};
