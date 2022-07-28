import { BUNDLED_LANGUAGES, Highlighter } from 'shiki';

type HighlightSnippetArgs = {
  code: string;
  highlighter?: Highlighter;
  language: string;
  lineHighlight: Array<[number, string]>;
  theme: string;
};

type HighLightOption = {
  classes: string[];
  line: number;
};

const buildLineOptions = (lineHighlight: Array<[number, string]>): HighLightOption[] => {
  return lineHighlight.map(([key, value]) => ({ classes: [`line-diff line-diff-${value}`], line: key }));
};

const addWhitespaceForEmptyLine = (line: string) => {
  if (/<span class="line (line-diff-?[a-z ]*)*"><\/span>/.test(line)) {
    const [openingBracket] = line.split('</span>');

    return `${openingBracket}&nbsp;&nbsp;</span>`;
  }

  return line;
};

export const highlightSnippet = ({ code, highlighter, language, lineHighlight, theme }: HighlightSnippetArgs) => {
  if (!highlighter) {
    return code;
  }

  return highlighter
    .codeToHtml(code, {
      lang: language,
      lineOptions: buildLineOptions(lineHighlight),
      theme,
    })
    .replace(/<pre class="shiki" style="background-color: \#[\w]{6}">/, '')
    .replace('</pre>', '')
    .split('\n')
    .map((line, i) => {
      return `<span class='line-number'>${i + 1}</span>${addWhitespaceForEmptyLine(line)}`;
    })
    .join('\n');
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

export const mapToArray = <Key, Value>(map: Map<Key, Value>): Array<[Key, Value]> => {
  const result: Array<[Key, Value]> = [];

  map.forEach((value, key) => {
    result.push([key, value]);
  });

  return result;
};
