import { useState } from 'react';
import { BUNDLED_LANGUAGES } from 'shiki';

import { HighLightOption, HighlightSnippetArgs, TextSelection } from '../../../../../../typings/snippet-form';

const languageNames = BUNDLED_LANGUAGES.map((language) => [language.id].concat(language.aliases ?? [])).flat();

export const useEditor = () => {
  const [textSelection, setTextSelection] = useState<TextSelection | null>(null);

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

  const highlightSnippet = ({ code, highlighter, language, lineHighlight, theme }: HighlightSnippetArgs) => {
    if (!highlighter) {
      return {
        codeHighlighted: `<pre>${code}</pre>`,
        codeHighlightedForPreview: `<pre>${code}</pre>`,
      };
    }

    const codeHighlightedWithoutLineNumbers = highlighter.codeToHtml(code, {
      lang: language,
      lineOptions: buildLineOptions(lineHighlight),
      theme,
    });

    const preTagRegex = /<pre class="shiki" style="background-color: \#[\w]{6}">/;

    const preMatcher = codeHighlightedWithoutLineNumbers.match(preTagRegex);

    const preHtml = preMatcher && preMatcher.length > 0 ? preMatcher[0] : '<pre class="no-shiki">';

    const codeHighlightedForPreview = codeHighlightedWithoutLineNumbers
      .replace(preTagRegex, '')
      .replace('</pre>', '')
      .split('\n')
      .map((line, i) => {
        return `<span class='line-number'>${i + 1}</span>${addWhitespaceForEmptyLine(line)}`;
      })
      .join('\n');

    return {
      codeHighlighted: `${preHtml}${codeHighlightedForPreview}</pre>`,
      codeHighlightedForPreview,
    };
  };

  const getLanguageFromExtension = (fileName?: string) => {
    const DEFAULT_LANGUAGE = 'txt';

    if (!fileName || !fileName.includes('.')) {
      return DEFAULT_LANGUAGE;
    }

    const language = fileName.split('.').pop();

    if (!language) {
      return DEFAULT_LANGUAGE;
    }

    const mappers: Record<string, string> = {
      yml: 'yaml',
    };

    const mappedLanguage = language in mappers ? mappers[language] : language;

    if (!mappedLanguage || (mappedLanguage && !languageNames.includes(mappedLanguage as any))) {
      return DEFAULT_LANGUAGE;
    }

    return mappedLanguage;
  };

  const mapToArray = <Key, Value>(map: Map<Key, Value>): Array<[Key, Value]> => {
    const result: Array<[Key, Value]> = [];

    map.forEach((value, key) => {
      result.push([key, value]);
    });

    return result;
  };

  const handleEditorSelect = (event: any) => {
    const textareaComponent = event.target;

    const { selectionEnd, selectionStart } = textareaComponent;
    const selectedLines = textareaComponent.value.substring(selectionStart, selectionEnd).split(/\r?\n|\r/);
    const numberOfLinesSelected = selectedLines.length;

    const [firstSelectionLine] = selectedLines;

    const allLines: string[] = textareaComponent.value.split(/\r?\n|\r/);

    if (!firstSelectionLine) {
      return;
    }

    const selectionStartLine = allLines.reduce((lineNumber, lineText, index) => {
      if (lineNumber >= 0) {
        return lineNumber;
      }

      return lineText.includes(firstSelectionLine) ? index : -1;
    }, -1);

    const lineHighlightStart = selectionStartLine + 1;
    const lineHighlightEnd = selectionStartLine + numberOfLinesSelected;

    setTextSelection({ end: lineHighlightEnd, start: lineHighlightStart });
  };

  const resetTextSelection = () => {
    setTextSelection(null);
  };

  return {
    getLanguageFromExtension,
    handleEditorSelect,
    highlightSnippet,
    mapToArray,
    resetTextSelection,
    textSelection,
  };
};
