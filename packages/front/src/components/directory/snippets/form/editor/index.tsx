import { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import Editor from 'react-simple-code-editor';
import { Highlighter } from 'shiki';

import SelectInput from '../../../../../forms/select-input';
import TextInput from '../../../../../forms/text-input';
import { EditorFormValues, SelectOption } from '../../../../../typings/components';
import { CODE_HIGHLIGHT_OPTIONS, THEME_BACKGROUND_COLOR_MAP } from '../../../../../utils/constants';
import { getLanguageFromExtension, highlightSnippet, mapToArray } from './utils';

type Props = {
  codeHighlightOptions: SelectOption[];
  highlighter?: Highlighter;
  themeOptions: SelectOption[];
};

type TextSelection = {
  end: number;
  start: number;
};

const SnippetTextEditor = ({ codeHighlightOptions, highlighter, themeOptions }: Props) => {
  const [textSelection, setTextSelection] = useState<TextSelection | null>(null);

  const { control, setValue, watch } = useFormContext<EditorFormValues>();

  const code = watch('code');
  const name = watch('name');
  const theme = watch('theme');
  const lineHighlight = watch('lineHighlight');
  const codeHighlight = watch('codeHighlight');

  const language = getLanguageFromExtension(name);

  useEffect(() => {
    const lineHighlightClone = new Map(lineHighlight);

    if (codeHighlight.id === 'none' || !textSelection) {
      if (!textSelection) {
        return;
      }

      for (let i = textSelection.start; i <= textSelection.end; i++) {
        lineHighlightClone.delete(i);
      }

      setValue('lineHighlight', mapToArray(lineHighlightClone));
      setTextSelection(null);
      window.getSelection()?.removeAllRanges();

      return;
    }

    for (let i = textSelection.start; i <= textSelection.end; i++) {
      lineHighlightClone.set(i, codeHighlight.id);
    }

    setValue('lineHighlight', mapToArray(lineHighlightClone));
    setValue('codeHighlight', CODE_HIGHLIGHT_OPTIONS[0]);
    setTextSelection(null);
    window.getSelection()?.removeAllRanges();
  }, [codeHighlight]);

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

  return (
    <div className="border rounded-tl-md rounded-tr-md flex flex-col">
      <div className="flex justify-between px-2 pt-1 pb-2 bg-gray-200 rounded-tl-md rounded-tr-md">
        <div className="w-2/5">
          <TextInput name="name" placeholder="Filename with the extension" className="py-1.5 border border-gray-300" />
        </div>
        <div className="flex space-x-3">
          <Controller
            name="codeHighlight"
            control={control}
            render={({ field }) => <SelectInput className="w-36" options={codeHighlightOptions} {...field} />}
          />
          <Controller
            name="theme"
            control={control}
            render={({ field }) => <SelectInput className="w-36" options={themeOptions} {...field} />}
          />
        </div>
      </div>
      <Editor
        value={code}
        onValueChange={(code) => setValue('code', code)}
        highlight={(code) => highlightSnippet({ code, highlighter, language, lineHighlight, theme: theme.id })}
        padding={6.5}
        style={{
          backgroundColor: THEME_BACKGROUND_COLOR_MAP[theme.id],
          caretColor: theme.id.includes('light') ? '#000' : '#fff',
          fontFamily: 'Inter, monospace',
          fontSize: 14,
          height: '100%',
          overflow: 'auto',
        }}
        className="code-editor-container"
        tabSize={4}
        insertSpaces
        onSelect={handleEditorSelect}
      />
    </div>
  );
};

export default SnippetTextEditor;
