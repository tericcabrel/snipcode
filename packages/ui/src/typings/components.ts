export type IconProps = {
  className?: string;
  height?: number;
  width?: number;
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
