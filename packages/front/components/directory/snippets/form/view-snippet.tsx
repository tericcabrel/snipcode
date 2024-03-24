import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';

import { SnippetTextEditor } from './editor';
import { SnippetFormValues, formSchema } from './form-schema';
import { generateSnippetLanguageOptions } from './utils';
import { Button } from '../../../../forms/button';
import { useCodeHighlighter } from '../../../../hooks';
import { useUpdateSnippet } from '../../../../services/snippets/update-snippet';
import { SelectOption } from '../../../../typings/components';
import { SnippetItem } from '../../../../typings/queries';
import { CODE_HIGHLIGHT_OPTIONS, THEME_OPTIONS } from '../../../../utils/constants';
import { extractLanguageFromName, lineHighlightToString } from '../../../../utils/snippets';
import { useToast } from '../../../toast/provider';

type Props = {
  snippet: SnippetItem;
};

const selectCodeHighlightOptionValue = (theme: string) => {
  const themeOption = THEME_OPTIONS.find((option) => option.id === theme);

  return themeOption ?? THEME_OPTIONS[0];
};

const selectLanguageOptionValue = (options: SelectOption[], language: string) => {
  return options.find((option) => option.id === language);
};

const ViewSnippet = ({ snippet }: Props) => {
  const { highlighter } = useCodeHighlighter();
  const { toastError, toastSuccess } = useToast();

  const { isLoading, updateSnippet } = useUpdateSnippet(snippet.folderId);
  const languageOptions = generateSnippetLanguageOptions();

  const formMethods = useForm<SnippetFormValues>({
    defaultValues: {
      code: snippet.content,
      codeHighlight: CODE_HIGHLIGHT_OPTIONS[0],
      codeHighlighted: snippet.contentHighlighted,
      description: snippet.description ?? undefined,
      isPrivate: snippet.isPrivate,
      language: selectLanguageOptionValue(languageOptions, snippet.language),
      lineHighlight: snippet.lineHighLight,
      name: snippet.name,
      theme: selectCodeHighlightOptionValue(snippet.theme),
    },
    resolver: yupResolver(formSchema),
  });

  const submitUpdateSnippet = async (values: SnippetFormValues) => {
    await updateSnippet({
      id: snippet.id,
      input: {
        content: values.code,
        contentHighlighted: values.codeHighlighted,
        description: values.description,
        language: values.language?.id ?? extractLanguageFromName(values.name),
        lineHighlight: values.lineHighlight ? lineHighlightToString(values.lineHighlight) : undefined,
        name: values.name,
        theme: values.theme.id,
        visibility: values.isPrivate ? 'private' : 'public',
      },
      onError: (message) => {
        toastError({ message: `Failed to update: ${message}` });
      },
      onSuccess: () => {
        toastSuccess({ message: 'Snippet updated!' });
      },
    });
  };

  return (
    <div>
      <FormProvider {...formMethods}>
        <SnippetTextEditor
          highlighter={highlighter}
          languageOptions={languageOptions}
          codeHighlightOptions={CODE_HIGHLIGHT_OPTIONS}
          themeOptions={THEME_OPTIONS}
        />
        <div className="mt-5 flex justify-end space-x-6">
          <Button
            className="w-auto"
            onClick={formMethods.handleSubmit(submitUpdateSnippet)}
            disabled={isLoading}
            isLoading={isLoading}
          >
            Update
          </Button>
        </div>
      </FormProvider>
    </div>
  );
};

export { ViewSnippet };
