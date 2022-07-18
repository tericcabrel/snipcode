import { BUNDLED_LANGUAGES, Highlighter } from 'shiki';

type HighlightSnippetArgs = {
  code: string;
  highlighter?: Highlighter;
  language: string;
  theme: string;
};

export const highlightSnippet = ({ code, highlighter, language, theme }: HighlightSnippetArgs) => {
  if (!highlighter) {
    return code;
  }

  const text = highlighter
    .codeToHtml(code, {
      lang: language,
      lineOptions: [],
      theme,
    })
    .replace(/<pre class="shiki" style="background-color: \#[\w]{6}">/, '')
    .replace('</pre>', '')
    .split('\n')
    .map((line, i) => `<span class='line-number'>${i + 1}</span>${line}`)
    .join('\n');

  return text;
};

export const getLanguageFromExtension = (fileName?: string) => {
  const DEFAULT_LANGUAGE = 'js';

  if (!fileName || !fileName.includes('.')) {
    return DEFAULT_LANGUAGE;
  }

  const possibleExtension = fileName.split('.').pop();

  const languageNames = BUNDLED_LANGUAGES.map((language) => language.id);

  if (!possibleExtension || (possibleExtension && !languageNames.includes(possibleExtension as any))) {
    return DEFAULT_LANGUAGE;
  }

  return possibleExtension;
};
