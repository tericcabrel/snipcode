import { Snippet } from '../../../../types/graphql';

const MAX_CONTENT_LINES = 10;

export const shortContentResolver = async (snippet: Snippet): Promise<string> => {
  const contentAsArray = snippet.content.split('\n');
  const maxItem = Math.min(MAX_CONTENT_LINES, contentAsArray.length);

  return contentAsArray.slice(0, maxItem).join('\n');
};
