import { useState } from 'react';

type Page = {
  nextToken: string | null;
  previousToken: string | null;
};

export const usePaginationToken = (nextToken: string | null) => {
  const [pages, setPages] = useState<Page[]>([{ nextToken, previousToken: null }]);
  const [canGoForward, setCanGoForward] = useState(!!nextToken);
  const [canGoBack, setCanGoBack] = useState(false);

  const getPage = (): Page | undefined => {
    return pages.pop();
  };

  const addPageFromNext = (token: string | null) => {
    const lastPage = pages.length > 0 ? pages[pages.length - 1] : undefined;

    const newPage: Page = {
      nextToken: token,
      previousToken: lastPage?.nextToken ?? null,
    };

    setPages([...pages, newPage]);

    setCanGoBack(!!newPage.previousToken);
    setCanGoForward(!!newPage.nextToken);
  };

  const addPageFromPrevious = (token: string | null) => {
    // should do nothing ???
    const lastPage = pages.length > 0 ? pages[pages.length - 1] : undefined;

    setCanGoBack(!!lastPage?.previousToken);
    setCanGoForward(!!lastPage?.nextToken);
  };

  return {
    addPageFromNext,
    addPageFromPrevious,
    canGoBack,
    canGoForward,
    getPage,
  };
};
