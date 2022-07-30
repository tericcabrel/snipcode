export const lineHighlightToString = (value: Array<[number, string]>) => {
  return JSON.stringify(value);
};

export const lineHighlightToArray = (value: string): Array<[number, string]> => {
  return JSON.parse(value);
};

export const extractLanguageFromName = (name: string): string => {
  if (!name.includes('.')) {
    return 'plain';
  }

  const nameArrayPart = name.split('.');

  return nameArrayPart[nameArrayPart.length - 1];
};
