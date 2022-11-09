import { Dialog, Transition } from '@headlessui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Fragment, useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import Button from '../../../../forms/button';
import { useCodeHighlighter } from '../../../../hooks';
import { useCreateSnippet } from '../../../../services/snippets/create-snippet';
import { CODE_HIGHLIGHT_OPTIONS, THEME_OPTIONS } from '../../../../utils/constants';
import { extractLanguageFromName, lineHighlightToString } from '../../../../utils/snippets';
import { useToast } from '../../../toast/provider';
import { SnippetTextEditor } from './editor';
import { SnippetFormValues, formSchema } from './form-schema';
import { generateSnippetLanguageOptions } from './utils';

type Props = {
  closeModal: () => void;
  folderId: string;
  open: boolean;
};

const CreateSnippetContainer = ({ closeModal, folderId, open }: Props) => {
  const cancelButtonRef = useRef(null);
  const { highlighter } = useCodeHighlighter();
  const { toastError, toastSuccess } = useToast();
  const { createSnippet, isLoading } = useCreateSnippet();

  const formMethods = useForm<SnippetFormValues>({
    defaultValues: {
      code: `import fs from "fs";
import path from "path";

const content= fs.readFileSync(path.resolve(__dirname, 'file.json'), { encoding: "utf-8" });

console.log(content);`,
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
      code: '',
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
    console.log('Values => ', values);

    await createSnippet({
      input: {
        content: values.code,
        contentHighlighted: values.codeHighlighted,
        description: values.description,
        folderId,
        language: values.language?.id ?? extractLanguageFromName(values.name),
        lineHighlight: lineHighlightToString(values.lineHighlight),
        name: values.name,
        theme: values.theme.id,
        visibility: values.isPrivate ? 'private' : 'public',
      },
      onError: (message) => {
        toastError({ message: `Failed to create: ${message}` });
      },
      onSuccess: () => {
        toastSuccess({ message: 'Snippet created!' });
        handleCloseModal();
      },
    });
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={handleCloseModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-[60%] sm:w-full sm:p-6">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                      Create a new snippet
                    </Dialog.Title>
                    <div className="mt-2">
                      <FormProvider {...formMethods}>
                        <SnippetTextEditor
                          highlighter={highlighter}
                          languageOptions={generateSnippetLanguageOptions()}
                          codeHighlightOptions={CODE_HIGHLIGHT_OPTIONS}
                          themeOptions={THEME_OPTIONS}
                        />
                      </FormProvider>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex justify-end space-x-6">
                  <Button className="w-auto" color="white-gray" onClick={handleCloseModal} ref={cancelButtonRef}>
                    Cancel
                  </Button>
                  <Button
                    className="w-auto"
                    onClick={formMethods.handleSubmit(submitCreateSnippet)}
                    disabled={isLoading}
                    isLoading={isLoading}
                  >
                    Create
                  </Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default CreateSnippetContainer;
