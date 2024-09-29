import { yupResolver } from '@hookform/resolvers/yup';
import { Loader2 } from 'lucide-react';
import { FormProvider, useForm } from 'react-hook-form';

import { SnippetTextEditor } from './editor';
import { SnippetFormValues, formSchema } from './form-schema';
import { generateSnippetLanguageOptions } from './utils';
import { useCodeHighlighter } from '../../../../hooks';
import { useToast } from '../../../../hooks/use-toast';
import { CODE_HIGHLIGHT_OPTIONS, THEME_OPTIONS } from '../../../../lib/constants';
import { extractLanguageFromName, lineHighlightToString } from '../../../../lib/snippets';
import { useCreateSnippet } from '../../../../services/snippets/create-snippet';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../../../ui/alert-dialog';

type Props = {
  closeModal: () => void;
  folderId: string;
  open: boolean;
};

const CreateSnippetContainer = ({ closeModal, folderId, open }: Props) => {
  const { highlighter } = useCodeHighlighter();
  const { toastError, toastSuccess } = useToast();
  const { createSnippet, isLoading } = useCreateSnippet();

  const formMethods = useForm<SnippetFormValues>({
    defaultValues: {
      code: `// Write your code here...\n`,
      codeHighlight: CODE_HIGHLIGHT_OPTIONS[0],
      codeHighlighted: '',
      isPrivate: true,
      lineHighlight: [],
      theme: THEME_OPTIONS[0],
    },
    resolver: yupResolver(formSchema),
  });

  const handleCloseModal = () => {
    closeModal();
    formMethods.reset({
      code: '// Write your code here...\n',
      codeHighlight: CODE_HIGHLIGHT_OPTIONS[0],
      codeHighlighted: '',
      description: '',
      isPrivate: true,
      lineHighlight: [],
      name: '',
      theme: THEME_OPTIONS[0],
    });
    formMethods.clearErrors();
  };

  const submitCreateSnippet = async (values: SnippetFormValues) => {
    await createSnippet({
      input: {
        content: values.code,
        contentHighlighted: values.codeHighlighted,
        description: values.description,
        folderId,
        language: values.language?.id ?? extractLanguageFromName(values.name),
        lineHighlight: values.lineHighlight ? lineHighlightToString(values.lineHighlight) : undefined,
        name: values.name,
        theme: values.theme.id,
        visibility: values.isPrivate ? 'private' : 'public',
      },
      onError: (message) => {
        toastError(`Failed to create: ${message}`);
      },
      onSuccess: () => {
        toastSuccess('Snippet created!');
        handleCloseModal();
      },
    });
  };

  return (
    <AlertDialog open={open}>
      <AlertDialogContent className="sm:max-w-[60%] sm:w-full">
        <AlertDialogHeader>
          <AlertDialogTitle>Create a new snippet</AlertDialogTitle>
          <AlertDialogDescription />
          <FormProvider {...formMethods}>
            <SnippetTextEditor
              highlighter={highlighter}
              languageOptions={generateSnippetLanguageOptions()}
              codeHighlightOptions={CODE_HIGHLIGHT_OPTIONS}
              themeOptions={THEME_OPTIONS}
            />
          </FormProvider>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-4">
          <AlertDialogCancel onClick={handleCloseModal}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={formMethods.handleSubmit(submitCreateSnippet)} disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Create
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export { CreateSnippetContainer };
