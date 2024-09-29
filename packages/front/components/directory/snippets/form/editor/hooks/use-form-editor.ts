import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { Highlighter } from 'shiki';

import { useEditor } from './use-editor';
import { CODE_HIGHLIGHT_OPTIONS } from '../../../../../../lib/constants';
import { EditorFormValues } from '../../../../../../typings/snippet-form';

export const useFormEditor = () => {
  const { setValue, watch } = useFormContext<EditorFormValues>();
  const {
    getLanguageFromExtension,
    handleEditorSelect,
    highlightSnippet,
    mapToArray,
    resetTextSelection,
    textSelection,
  } = useEditor();

  const code = watch('code');
  const name = watch('name');
  const theme = watch('theme');
  const language = watch('language');
  const lineHighlight = watch('lineHighlight');
  const codeHighlight = watch('codeHighlight');

  const codeLanguage = language?.id ?? getLanguageFromExtension(name);

  useEffect(() => {
    const lineHighlightClone = new Map(lineHighlight);

    if (codeHighlight.id === 'none' || !textSelection) {
      if (!textSelection) {
        return;
      }

      for (let i = textSelection.start; i <= textSelection.end; i++) {
        lineHighlightClone.delete(i);
      }

      setValue('lineHighlight', mapToArray(lineHighlightClone));
      resetTextSelection();
      window.getSelection()?.removeAllRanges();

      return;
    }

    for (let i = textSelection.start; i <= textSelection.end; i++) {
      lineHighlightClone.set(i, codeHighlight.id);
    }

    setValue('lineHighlight', mapToArray(lineHighlightClone));
    setValue('codeHighlight', CODE_HIGHLIGHT_OPTIONS[0]);
    resetTextSelection();
    window.getSelection()?.removeAllRanges();
  }, [codeHighlight]);

  const onHighlight = (highlighter?: Highlighter) => (code: string) => {
    return highlightSnippet({
      code,
      highlighter,
      language: codeLanguage,
      lineHighlight: lineHighlight ?? [],
      theme: theme.id,
    });
  };

  return {
    code,
    handleEditorSelect,
    highlightSnippet,
    language,
    name,
    onHighlight,
    textSelection,
    theme,
  };
};
