import { BUNDLED_LANGUAGES, Highlighter } from 'shiki';

type HighlightSnippetArgs = {
  code: string;
  highlighter?: Highlighter;
  language: string;
  lineHighlightOptions: Map<number, string>;
  theme: string;
};

type HighLightOption = {
  classes: string[];
  line: number;
};

const buildLineOptions = (highlightOptions: Map<number, string>): HighLightOption[] => {
  const options: HighLightOption[] = [];

  highlightOptions.forEach((value, key) => {
    options.push({ classes: [`line-diff line-diff-${value}`], line: key });
  });

  return options;
};

const addWhitespaceForEmptyLine = (line: string) => {
  if (/<span class="line (line-diff-?[a-z ]*)*"><\/span>/.test(line)) {
    const [openingBracket] = line.split('</span>');

    return `${openingBracket}&nbsp;&nbsp;</span>`;
  }

  return line;
};

export const highlightSnippet = ({
  code,
  highlighter,
  language,
  lineHighlightOptions,
  theme,
}: HighlightSnippetArgs) => {
  if (!highlighter) {
    return code;
  }

  console.log(lineHighlightOptions);

  const text = highlighter
    .codeToHtml(code, {
      lang: language,
      lineOptions: buildLineOptions(lineHighlightOptions),
      theme,
    })
    .replace(/<pre class="shiki" style="background-color: \#[\w]{6}">/, '')
    .replace('</pre>', '')
    .split('\n')
    .map((line, i) => {
      return `<span class='line-number'>${i + 1}</span>${addWhitespaceForEmptyLine(line)}`;
    })
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
