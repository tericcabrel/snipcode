import { Dialog, Transition } from '@headlessui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Fragment, useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';

import Button from '../../../../forms/button';
import TextInput from '../../../../forms/text-input';
import { useCreateFolder } from '../../../../services/folders/create-folder';
import { useUpdateFolder } from '../../../../services/folders/update-folder';
import { FolderItem } from '../../../../typings/components';
import { FOLDER_NAME_REGEX, FORM_ERRORS } from '../../../../utils/constants';
import { useToast } from '../../../toast/provider';

type Props = {
  closeModal: () => void;
  currentFolder: FolderItem | null;
  parentFolderId: string;
};

const MIN_NAME_LENGTH = 1;
const MAX_NAME_LENGTH = 100;
const formSchema = yup.object().shape({
  name: yup
    .string()
    .required(FORM_ERRORS.fieldRequired)
    .min(MIN_NAME_LENGTH, FORM_ERRORS.minCharacters(MIN_NAME_LENGTH))
    .max(MAX_NAME_LENGTH, FORM_ERRORS.minCharacters(MAX_NAME_LENGTH))
    .matches(FOLDER_NAME_REGEX, { excludeEmptyString: false, message: FORM_ERRORS.folderNameInvalid }),
});

type FormValues = { name: string };

const EditFolderContainer = ({ closeModal, currentFolder, parentFolderId }: Props) => {
  const cancelButtonRef = useRef(null);
  const { toastError, toastSuccess } = useToast();
  const { createFolder, isLoading: isCreateFolderLoading } = useCreateFolder();
  const { isLoading: isUpdateFolderLoading, updateFolder } = useUpdateFolder(parentFolderId);

  const isLoading = isCreateFolderLoading || isUpdateFolderLoading;

  const formMethods = useForm<FormValues>({
    defaultValues: {
      name: currentFolder?.name,
    },
    resolver: yupResolver(formSchema),
  });

  const submitCreateFolder = async (values: FormValues) => {
    await createFolder({
      input: {
        name: values.name,
        parentId: parentFolderId,
      },
      onError: (message) => {
        toastError({ message: `Failed to create: ${message}` });
      },
      onSuccess: () => {
        toastSuccess({ message: 'Folder created!' });
        closeModal();
      },
    });
  };

  const submitUpdateFolder = async (values: FormValues) => {
    if (!currentFolder || currentFolder.name === values.name) {
      return;
    }

    await updateFolder({
      id: currentFolder.id,
      input: {
        name: values.name,
      },
      onError: (message) => {
        toastError({ message: `Failed to update: ${message}` });
      },
      onSuccess: () => {
        toastSuccess({ message: 'Folder updated!' });

        closeModal();
      },
    });
  };

  const handleSubmit = async (values: FormValues) => {
    if (currentFolder) {
      return submitUpdateFolder(values);
    }

    return submitCreateFolder(values);
  };

  return (
    <Transition.Root show as={Fragment}>
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
              <Dialog.Panel className="relative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full sm:p-6">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                      {currentFolder ? 'Rename folder' : 'Create a new folder'}
                    </Dialog.Title>
                    <div className="mt-2">
                      <FormProvider {...formMethods}>
                        <TextInput className="mt-6 w-full" type="text" name="name" />
                      </FormProvider>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex justify-end space-x-6">
                  <Button className="w-auto" color="white-gray" onClick={closeModal} ref={cancelButtonRef}>
                    Cancel
                  </Button>
                  <Button
                    className="w-auto"
                    onClick={formMethods.handleSubmit(handleSubmit)}
                    disabled={isLoading}
                    isLoading={isLoading}
                  >
                    {currentFolder ? 'Update' : 'Create'}
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

export { EditFolderContainer };
