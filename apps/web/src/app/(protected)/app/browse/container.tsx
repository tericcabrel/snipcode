'use client';

import { Button } from '@snipcode/front/forms/button';
import { SelectInput } from '@snipcode/front/forms/select-input';
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon, SearchIcon } from '@snipcode/front/icons';
import { usePublicSnippets } from '@snipcode/front/services';
import { SelectOption } from '@snipcode/front/typings/components';
import { PublicSnippetItem, PublicSnippetResult } from '@snipcode/front/typings/queries';
import { useState } from 'react';

import { PublicSnippet } from '@/components/snippets/public-snippet';
import { usePaginationToken } from '@/hooks/use-pagination-token';

type SortMethod = 'recently_updated' | 'recently_created';

type Props = {
  data: PublicSnippetResult;
};

const sortOptions: SelectOption[] = [
  { id: 'recently_created', label: 'Sort: recently created' },
  { id: 'recently_updated', label: 'Sort: recently updated' },
];

export const BrowseContainer = ({ data }: Props) => {
  const [snippetList, setSnippetList] = useState<PublicSnippetItem[]>(data.items);
  const [sortOption, setSortOption] = useState<SelectOption>(sortOptions[0]);
  const [search, setSearch] = useState<string | undefined>();
  const { addPageFromNext, addPageFromPrevious, canGoBack, canGoForward, getPage } = usePaginationToken(
    data.nextToken ?? null,
  );

  const { findPublicSnippets } = usePublicSnippets();

  const onSearchChange = (value: string) => {
    setSearch(value);

    console.log('Search => ', search);

    // TODO make request
  };

  const onSortOptionChange = (option: SelectOption) => {
    setSortOption(option);

    console.log('Sort option => ', sortOption);

    // TODO make request
  };

  const onNextItemClick = async () => {
    const page = getPage();

    await findPublicSnippets({
      input: {
        itemPerPage: data.itemPerPage,
        keyword: search,
        nextToken: page?.nextToken,
        sortMethod: sortOption.id as SortMethod,
      },
      onCompleted: (data) => {
        console.log('Result Next => ', data);

        if (!data) {
          return;
        }
        setSnippetList(data.items);
        addPageFromNext(data.nextToken ?? null);
      },
    });
  };

  const onPreviousItemClick = async () => {
    const page = getPage();

    await findPublicSnippets({
      input: {
        itemPerPage: data.itemPerPage,
        keyword: search,
        nextToken: page?.nextToken,
        sortMethod: sortOption.id as SortMethod,
      },
      onCompleted: (data) => {
        console.log('Result Previous => ', data);

        if (!data) {
          return;
        }
        setSnippetList(data.items);
        addPageFromPrevious();
      },
    });
  };

  return (
    <div className="py-10">
      <main>
        <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
          <div className="w-full mx-auto border-b border-gray-400 flex justify-between pb-4">
            <div className="relative mt-1 rounded-md shadow-sm w-1/4">
              <input
                className="block w-full rounded-md border-gray-300 pr-10 sm:text-sm"
                id="account-number"
                name="account-number"
                placeholder="Search..."
                type="text"
                onChange={(e) => onSearchChange(e.target.value)}
              />
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <SearchIcon className="h-5 w-5 text-gray-400" />
              </div>
            </div>
            <SelectInput
              className="w-1/5 cursor-pointer"
              options={sortOptions}
              value={sortOption}
              onChange={onSortOptionChange}
            />
          </div>
          <div className="px-4 py-8 sm:px-0">
            <div className="space-y-6 min-h-96">
              {snippetList.map((snippet) => (
                <PublicSnippet key={snippet.id} snippet={snippet} />
              ))}
            </div>
            <div className="w-full flex justify-center mt-10 space-x-4">
              <Button
                className="bg-gray-200 w-auto items-center"
                color="white-gray"
                disabled={!canGoBack}
                onClick={onPreviousItemClick}
              >
                <ChevronDoubleLeftIcon className="w-6 h-4" />
                Previous
              </Button>
              <Button
                className="bg-gray-200 w-auto items-center"
                color="white-gray"
                disabled={!canGoForward}
                onClick={onNextItemClick}
              >
                Next
                <ChevronDoubleRightIcon className="w-6 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
