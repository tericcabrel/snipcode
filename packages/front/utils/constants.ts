import { SelectOption } from '../typings/components';

export const REGEX_EMAIL = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
export const FOLDER_NAME_REGEX = /^((\w)+\s?\-*)+$/;

export const FORM_ERRORS = {
  emailInvalid: 'The email address is invalid.',
  fieldRequired: 'This field is required.',
  folderNameInvalid: 'The name must only contains alphabetical letters, numbers and _-',
  maxCharacters: (numChar: number) => `Must be at most ${numChar} characters`,
  minCharacters: (numChar: number) => `Must be at least ${numChar} characters`,
  passwordNotMatch: "The confirm password doesn't match the password",
};

export const COLORS: string[] = [
  '#1abc9c',
  '#2ecc71',
  '#3498db',
  '#9b59b6',
  '#34495e',
  '#16a085',
  '#27ae60',
  '#2980b9',
  '#8e44ad',
  '#2c3e50',
  '#f1c40f',
  '#e67e22',
  '#e74c3c',
  '#95a5a6',
  '#f39c12',
  '#d35400',
  '#c0392b',
  '#bdc3c7',
  '#7f8c8d',
];

export const CODE_HIGHLIGHT_OPTIONS: SelectOption[] = [
  { id: 'none', label: 'None' },
  { id: 'blur', label: 'Blur' },
  { id: 'add', label: 'Diff Add' },
  { id: 'delete', label: 'Diff Remove' },
  { id: 'current', label: 'Current Line' },
];

export const THEME_OPTIONS: SelectOption[] = [
  { id: 'one-dark-pro', label: 'One Dark Pro' },
  { id: 'dracula', label: 'Dracula' },
  { id: 'dark-plus', label: 'Dark plus' },
  { id: 'monokai', label: 'Monokai' },
  { id: 'github-dark', label: 'GitHub Dark' },
  { id: 'github-light', label: 'GitHub Light' },
];

export const THEME_BACKGROUND_COLOR_MAP: Record<string, string> = {
  'dark-plus': '#1E1E1E',
  dracula: '#282A36',
  'github-dark': '#22272e',
  'github-light': '#ffffff',
  monokai: '#272822',
  'one-dark-pro': '#282c34',
};

export const SNIPPET_ITEM_PER_PAGE = 10;
