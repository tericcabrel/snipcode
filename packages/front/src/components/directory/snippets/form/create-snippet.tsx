import { Dialog, Transition } from '@headlessui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Fragment, useEffect, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Highlighter } from 'shiki';
import * as yup from 'yup';

import Button from '../../../../forms/button';
import TextInput from '../../../../forms/text-input';
import { FORM_ERRORS, SNIPPET_NAME_REGEX } from '../../../../utils/constants';
import SnippetTextEditor from './editor';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const shiki = require('shiki');

type Props = {
  closeModal: () => void;
  open: boolean;
};

const MIN_NAME_LENGTH = 1;
const MAX_NAME_LENGTH = 100;
const formSchema = yup.object().shape({
  name: yup
    .string()
    .required(FORM_ERRORS.fieldRequired)
    .min(MIN_NAME_LENGTH, FORM_ERRORS.minCharacters(MIN_NAME_LENGTH))
    .max(MAX_NAME_LENGTH, FORM_ERRORS.minCharacters(MAX_NAME_LENGTH))
    .matches(SNIPPET_NAME_REGEX, { excludeEmptyString: false, message: FORM_ERRORS.snippetNameInvalid }),
});

type FormValues = { name?: string };

const CreateSnippetContainer = ({ closeModal, open }: Props) => {
  const cancelButtonRef = useRef(null);

  const [highlighter, setHighlighter] = useState<Highlighter | undefined>();

  useEffect(() => {
    const loadShikiAssets = async () => {
      shiki.setCDN('/assets/shiki/');

      return shiki.getHighlighter({
        langs: ['javascript', 'html', 'css', 'typescript', 'java', 'c', 'cpp', 'c#'],
        theme: 'github-dark-dimmed',
      });
    };

    void loadShikiAssets().then((result) => {
      setHighlighter(result);
    });
  }, []);

  const formMethods = useForm<FormValues>({
    defaultValues: {
      name: 'New file',
    },
    resolver: yupResolver(formSchema),
  });

  const submitCreateSnippet = (values: FormValues) => {
    console.log(values);
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={closeModal}>
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
                        <TextInput className="mt-6 w-full" type="text" name="name" />

                        <SnippetTextEditor highlighter={highlighter} />
                      </FormProvider>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <Button
                    className="sm:w-auto sm:ml-3 sm:text-sm mt-0 rounded-md"
                    onClick={formMethods.handleSubmit(submitCreateSnippet)}
                  >
                    Create
                  </Button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:w-auto sm:text-sm"
                    onClick={closeModal}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
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
