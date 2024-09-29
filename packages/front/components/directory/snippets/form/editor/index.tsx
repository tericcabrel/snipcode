import { Controller, useFormContext } from 'react-hook-form';
import Editor from 'react-simple-code-editor';
import { Highlighter } from 'shiki';

import { useFormEditor } from './hooks/use-form-editor';
import { SelectInput } from '../../../../../forms/select-input';
import { TextInput } from '../../../../../forms/text-input';
import { THEME_BACKGROUND_COLOR_MAP } from '../../../../../lib/constants';
import { SelectOption } from '../../../../../types/components';
import { EditorFormValues } from '../../../../../types/snippet-form';
import { Label } from '../../../../ui/label';
import { Switch } from '../../../../ui/switch';

type Props = {
  codeHighlightOptions: SelectOption[];
  highlighter?: Highlighter;
  languageOptions: SelectOption[];
  themeOptions: SelectOption[];
};

export const SnippetTextEditor = ({ codeHighlightOptions, highlighter, languageOptions, themeOptions }: Props) => {
  const { control, setValue } = useFormContext<EditorFormValues>();
  const { code, handleEditorSelect, onHighlight, theme } = useFormEditor();

  const handleCodeHighlight = (codeToHighlight: string) => {
    const highlightedCode = onHighlight(highlighter)(codeToHighlight);

    setValue('codeHighlighted', highlightedCode.codeHighlighted);

    return highlightedCode.codeHighlightedForPreview;
  };

  return (
    <div>
      <div className="w-full flex items-center space-x-4">
        <Controller
          name="isPrivate"
          control={control}
          render={({ field }) => (
            <div className="w-1/5 mt-2 flex items-center">
              <Label htmlFor="isPrivate" className="mr-2">
                Make private?
              </Label>
              <Switch id="isPrivate" checked={field.value} onCheckedChange={field.onChange} />
            </div>
          )}
        />
        <TextInput
          groupClassName="mt-6 mb-5 w-4/5"
          type="text"
          name="description"
          placeholder="Snippet description..."
        />
      </div>
      <div className="border rounded-tl-md rounded-tr-md flex flex-col">
        <div className="flex justify-between px-2 pt-1 pb-2 bg-gray-200 rounded-tl-md rounded-tr-md">
          <div className="w-2/5">
            <TextInput
              name="name"
              placeholder="Filename with the extension"
              className="py-1.5 border border-gray-300"
            />
          </div>
          <div className="flex space-x-3">
            <Controller
              name="language"
              control={control}
              render={({ field }) => (
                <SelectInput className="w-40" options={languageOptions} placeholder="Language" {...field} />
              )}
            />
            <Controller
              name="codeHighlight"
              control={control}
              render={({ field }) => (
                <SelectInput className="w-36" options={codeHighlightOptions} placeholder="Code style" {...field} />
              )}
            />
            <Controller
              name="theme"
              control={control}
              render={({ field }) => (
                <SelectInput className="w-36" options={themeOptions} placeholder="Theme" {...field} />
              )}
            />
          </div>
        </div>
        <Editor
          value={code}
          onValueChange={(code) => setValue('code', code)}
          highlight={handleCodeHighlight}
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
    </div>
  );
};
