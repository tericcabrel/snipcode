import React from 'react';

export type IconProps = {
  className?: string;
  height?: number;
  width?: number;
};

export type SelectOption = {
  extra?: any;
  id: string;
  label: string;
};

export type ColorVariants = 'primary' | 'red' | 'white-gray';

export type FolderItem = {
  fileCount: number;
  id: string;
  name: string;
};

export type FilePath = {
  id: string;
  name: string;
};

export type SnippetItem = {
  content: string;
  folderId: string;
  id: string;
  language: string;
  name: string;
};

export type MenuItemAction = {
  icon?: React.ReactNode;
  label: string;
  onClick: () => void;
};

// export type SupportedTheme = 'one-dark-pro' | 'dracula' | 'dark-plus' | 'monokai' | 'github-dark' | 'github-light';
