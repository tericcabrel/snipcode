import { Highlighter, HighlighterOptions } from 'shiki';

export type Shiki = {
  getHighlighter: (options: HighlighterOptions) => Promise<Highlighter>;
};
