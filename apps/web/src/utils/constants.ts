export const COOKIE_NAME = 'shguid';
export const REGEX_EMAIL = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
export const IS_DEV = process.env.NEXT_PUBLIC_APP_ENV === 'development';
export const IS_PROD = process.env.NEXT_PUBLIC_APP_ENV === 'production';

export const FORM_ERRORS = {
  emailInvalid: 'The email address is invalid.',
  fieldRequired: 'This field is required.',
  maxCharacters: (numChar: number) => `Must be at most ${numChar} characters`,
  minCharacters: (numChar: number) => `Must be at least ${numChar} characters`,
  passwordNotMatch: "The confirm password doesn't match the password",
};

export const BAD_LOGIN_MESSAGE = 'The email or password is invalid.';
