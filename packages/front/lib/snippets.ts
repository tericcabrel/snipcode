export const lineHighlightToString = (value: Array<[number, string]>) => {
  return JSON.stringify(value);
};

export const extractLanguageFromName = (name: string): string => {
  if (!name.includes('.')) {
    return 'txt';
  }

  const nameArrayPart = name.split('.');

  return nameArrayPart[nameArrayPart.length - 1];
};
