export const COOKIE_NAME = 'shguid';
export const REGEX_EMAIL = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
export const IS_DEV = process.env.NEXT_PUBLIC_APP_ENV === 'development';
export const IS_PROD = process.env.NEXT_PUBLIC_APP_ENV === 'production';
