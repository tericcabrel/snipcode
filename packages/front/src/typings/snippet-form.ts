import { Highlighter } from 'shiki';

import { SelectOption } from './components';

export type HighlightSnippetArgs = {
  code: string;
  highlighter?: Highlighter;
  language: string;
  lineHighlight: Array<[number, string]>;
  theme: string;
};

export type HighLightOption = {
  classes: string[];
  line: number;
};

export type TextSelection = {
  end: number;
  start: number;
};

export type EditorFormValues = {
  code: string;
  codeHighlight: SelectOption;
  codeHighlighted: string;
  description: string;
  isPrivate: boolean;
  lineHighlight: Array<[number, string]>;
  name: string;
  theme: SelectOption;
};
