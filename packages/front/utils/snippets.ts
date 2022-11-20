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

export const generateShareableLink = (snippetId: string): string => {
  return `${process.env.SHAREABLE_HOST}/snippets/${snippetId}`;
};

export const generateEmbeddableLink = (snippetId: string): string => {
  return `${process.env.EMBEDDABLE_HOST}/${snippetId}`;
};
