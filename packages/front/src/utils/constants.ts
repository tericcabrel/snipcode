export const REGEX_EMAIL = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
export const FOLDER_NAME_REGEX = /^((\w)+\s?\-?)+$/;

export const FORM_ERRORS = {
  emailInvalid: 'The email address is invalid.',
  fieldRequired: 'This field is required.',
  folderNameInvalid: 'The name must only contains alphabetical letters, numbers and _-',
  maxCharacters: (numChar: number) => `Must be at most ${numChar} characters`,
  minCharacters: (numChar: number) => `Must be at least ${numChar} characters`,
  passwordNotMatch: "The confirm password doesn't match the password",
};

export const colors: string[] = [
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
