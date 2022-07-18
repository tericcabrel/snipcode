import { Controller, useFormContext } from 'react-hook-form';
import Editor from 'react-simple-code-editor';
import { Highlighter } from 'shiki';

import SelectInput from '../../../../../forms/select-input';
import TextInput from '../../../../../forms/text-input';
import { EditorFormValues, SelectOption } from '../../../../../typings/components';
import { THEME_BACKGROUND_COLOR_MAP } from '../../../../../utils/constants';
import { getLanguageFromExtension, highlightSnippet } from './utils';

type Props = {
  highlightOptions: SelectOption[];
  highlighter?: Highlighter;
  themeOptions: SelectOption[];
};

const SnippetTextEditor = ({ highlightOptions, highlighter, themeOptions }: Props) => {
  const { control, setValue, watch } = useFormContext<EditorFormValues>();

  const theme = watch('theme');
  const code = watch('code');
  const name = watch('name');

  const language = getLanguageFromExtension(name);

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
            render={({ field }) => <SelectInput className="w-36" options={highlightOptions} {...field} />}
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
        highlight={(code) => highlightSnippet({ code, highlighter, language, theme: theme.id })}
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
        tabSize={2}
        insertSpaces
      />
    </div>
  );
};

export default SnippetTextEditor;
