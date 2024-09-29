'use client';

import { useState } from 'react';

import { BreadCrumb } from './breadcrumb';
import { EmptyFolder } from './folders/empty';
import { Folder } from './folders/folder';
import { EditFolderContainer } from './folders/form/edit-folder';
import { CreateSnippetContainer } from './snippets/form/create-snippet';
import { Snippet } from './snippets/snippet';
import { useBooleanState } from '../../hooks';
import { useToast } from '../../hooks/use-toast';
import { displayItemLabel } from '../../lib/text';
import { useDeleteFolders } from '../../services/folders/delete-folders';
import { useListDirectory } from '../../services/folders/list-directory';
import { useDeleteSnippet } from '../../services/snippets/delete-snippet';
import { FolderItem, SnippetItem } from '../../typings/components';
import { ConfirmDialog } from '../dialog/confirm-dialog';
import { MenuAction } from '../menu-action';

type Props = {
  embeddableHostUrl: string;
  folderId: string;
  onBreadcrumbPathClick: (folderId: string, path: string) => Promise<void>;
  onNavigateToFolder: (folderId: string) => void;
  onSnippetClick: (snippetId: string) => void;
  rootFolderId: string;
  shareableHostUrl: string;
  title: string;
};

type ItemToDelete = {
  id: string;
  type: 'snippet' | 'folder';
};

const generateConfirmDialogMessage = (item: ItemToDelete | null, folders: FolderItem[]) => {
  if (!item) {
    return null;
  }

  if (item.type === 'snippet') {
    return 'Are you sure you want to delete this snippet?';
  }

  const folderItem = folders.find((folder) => item.id === folder.id);

  if (!folderItem) {
    return null;
  }

  if (folderItem.fileCount === 0) {
    return 'Are you sure you want to delete this folder?';
  }

  return `This folder has ${displayItemLabel(folderItem.fileCount, 'item')}; are you sure you want to delete it?`;
};

export const Directory = ({
  embeddableHostUrl,
  folderId,
  onBreadcrumbPathClick,
  onNavigateToFolder,
  onSnippetClick,
  rootFolderId,
  shareableHostUrl,
  title,
}: Props) => {
  const [isNewFolderOpened, openNewFolderModal, closeNewFolderModal] = useBooleanState(false);
  const [isNewSnippetOpened, openNewSnippetModal, closeNewSnippetModal] = useBooleanState(false);
  const [isConfirmDialogOpen, openConfirmDialog, closeConfirmDialog] = useBooleanState(false);
  const [itemToDelete, setItemToDelete] = useState<ItemToDelete | null>(null);
  const [selectedFolder, setSelectedFolder] = useState<FolderItem | null>(null);

  const { toastError, toastSuccess } = useToast();

  const { data } = useListDirectory(folderId);
  const { deleteSnippet, isLoading: isDeleteSnippetLoading } = useDeleteSnippet(folderId);
  const { deleteFolders, isLoading: isDeleteFolderLoading } = useDeleteFolders(folderId);

  const isDirectoryEmpty = data && data.folders.length + data.snippets.length === 0;

  const folders = data?.folders ?? [];
  const snippets = data?.snippets ?? [];
  const paths = data?.paths ?? [];

  const goToFolder = (folderId: string) => {
    onNavigateToFolder(folderId);
  };

  const openSnippet = (snippet: SnippetItem) => {
    onSnippetClick(snippet.id);
  };

  const onDeleteSnippet = (snippet: SnippetItem) => {
    setItemToDelete({ id: snippet.id, type: 'snippet' });
    openConfirmDialog();
  };

  const handleDeleteSnippetClick = async () => {
    if (!itemToDelete || itemToDelete.type !== 'snippet') {
      return;
    }

    await deleteSnippet({
      id: itemToDelete.id,
      onError: (message) => {
        toastError(`Failed to delete: ${message}`);
      },
      onSuccess: () => {
        toastSuccess('Snippet deleted!');

        closeConfirmDialog();
        setItemToDelete(null);
      },
    });
  };

  const onRenameFolder = (folder: FolderItem) => {
    setSelectedFolder(folder);

    openNewFolderModal();
  };

  const onDeleteFolder = (folder: FolderItem) => {
    setItemToDelete({ id: folder.id, type: 'folder' });

    openConfirmDialog();
  };

  const handleDeleteFolderClick = async () => {
    if (!itemToDelete || itemToDelete.type !== 'folder') {
      return;
    }

    await deleteFolders({
      ids: [itemToDelete.id],
      onError: (message) => {
        toastError(`Failed to delete: ${message}`);
      },
      onSuccess: () => {
        toastSuccess('Folder deleted!');

        closeConfirmDialog();
        setItemToDelete(null);
      },
    });
  };

  const handleConfirmDialogClick = async () => {
    if (!itemToDelete) {
      return;
    }

    switch (itemToDelete.type) {
      case 'folder':
        return handleDeleteFolderClick();
      case 'snippet':
        return handleDeleteSnippetClick();

      default:
        return;
    }
  };

  return (
    <>
      <header>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="text-3xl font-bold leading-tight text-gray-900">{title}</div>
          <MenuAction onNewFolderClick={openNewFolderModal} onNewSnippetClick={openNewSnippetModal} />
        </div>
      </header>
      <main>
        <div className="max-w-7xl py-8 mx-auto sm:px-6 lg:px-8">
          <BreadCrumb
            paths={paths}
            current={folderId}
            onPathClick={onBreadcrumbPathClick}
            rootFolderId={rootFolderId}
          />
          {isDirectoryEmpty ? (
            <div className="border-4 border-dashed border-gray-200 rounded-lg flex justify-center items-center py-8 px-0 mt-6 h-96">
              <div className="w-1/2">
                <EmptyFolder handleCreateFolder={openNewFolderModal} handleCreateSnippet={openNewSnippetModal} />
              </div>
            </div>
          ) : (
            <div className="min-h-96">
              <div className="mt-6 grid grid-cols-5 gap-4">
                {folders.map((folder) => (
                  <Folder
                    item={folder}
                    key={folder.id}
                    onNavigate={goToFolder}
                    onRenameClick={onRenameFolder}
                    onDeleteClick={onDeleteFolder}
                  />
                ))}
              </div>
              <div className="my-8 text-md font-bold text-gray-500">Files</div>
              <div className="mt-6 grid grid-cols-4 gap-4">
                {snippets.map((snippet) => (
                  <Snippet
                    embeddableHostUrl={embeddableHostUrl}
                    item={snippet}
                    key={snippet.id}
                    shareableHostUrl={shareableHostUrl}
                    onClick={openSnippet}
                    onDeleteClick={onDeleteSnippet}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      {isNewFolderOpened && (
        <EditFolderContainer
          closeModal={closeNewFolderModal}
          currentFolder={selectedFolder}
          parentFolderId={folderId}
        />
      )}
      <CreateSnippetContainer open={isNewSnippetOpened} closeModal={closeNewSnippetModal} folderId={folderId} />
      {isConfirmDialogOpen && (
        <ConfirmDialog
          isLoading={isDeleteSnippetLoading || isDeleteFolderLoading}
          open={isConfirmDialogOpen}
          onConfirmButtonClick={handleConfirmDialogClick}
          onCancelButtonClick={closeConfirmDialog}
          messageText={generateConfirmDialogMessage(itemToDelete, folders)}
        />
      )}
    </>
  );
};
