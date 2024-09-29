'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { Loader2 } from 'lucide-react';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { TextInput } from '../../../../forms/text-input';
import { useToast } from '../../../../hooks/use-toast';
import { FOLDER_NAME_REGEX, FORM_ERRORS } from '../../../../lib/constants';
import { useCreateFolder } from '../../../../services/folders/create-folder';
import { useUpdateFolder } from '../../../../services/folders/update-folder';
import { FolderItem } from '../../../../typings/components';
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
        toastError(`Failed to create: ${message}`);
      },
      onSuccess: () => {
        toastSuccess('Folder created!');
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
        toastError(`Failed to update: ${message}`);
      },
      onSuccess: () => {
        toastSuccess('Folder updated!');

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
    <AlertDialog defaultOpen>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{currentFolder ? 'Rename folder' : 'Create a new folder'}</AlertDialogTitle>
          <AlertDialogDescription />
          <FormProvider {...formMethods}>
            <TextInput className="mt-6 w-full" type="text" name="name" />
          </FormProvider>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-4">
          <AlertDialogCancel onClick={closeModal}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={formMethods.handleSubmit(handleSubmit)} disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {currentFolder ? 'Update' : 'Create'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export { EditFolderContainer };
