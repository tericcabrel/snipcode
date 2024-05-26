export const PATH_NOT_FOUND = 'Path not found';

export const DATE_REGEX = /^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/;

export const CORS_APOLLO_STUDIO_URL = 'https://studio.apollographql.com';
export const NEWSLETTER_SUBSCRIBE_SUCCESS = 'Subscribed to the newsletter successfully';

export const AUTH_USER_NOT_FOUND = 'The authenticated user not found';
export const AUTH_USER_NOT_FOUND_CODE = 'AUTH_USER_NOT_FOUND';

export const AUTH_SUCCESS_URL = (webAuthSuccessUrl: string, sessionToken: string): string => {
  return `${webAuthSuccessUrl}?token=${sessionToken}`;
};
