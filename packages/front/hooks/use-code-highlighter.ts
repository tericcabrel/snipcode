import { useEffect, useState } from 'react';
import { Highlighter } from 'shiki';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const shiki = require('shiki');

export const useCodeHighlighter = () => {
  const [highlighter, setHighlighter] = useState<Highlighter | undefined>();

  useEffect(() => {
    const loadShikiAssets = async () => {
      shiki.setCDN('/assets/shiki/');

      return shiki.getHighlighter({
        theme: 'monokai',
        themes: ['one-dark-pro', 'dracula', 'dark-plus', 'monokai', 'github-dark', 'github-light'],
      });
    };

    void loadShikiAssets().then((result) => {
      setHighlighter(result);
    });
  }, []);

  return { highlighter };
};
