import { Button, Icon, PublicSnippetResult } from '@sharingan/front';
import SelectInput from '@sharingan/front/src/forms/select-input';
import { SelectOption } from '@sharingan/front/src/typings/components';
import { NextSeo } from 'next-seo';
import { useState } from 'react';

import Layout from '@/components/layout/private/layout';
import { PublicSnippet } from '@/components/snippets/public-snippet';

type Props = {
  data: PublicSnippetResult;
};

const sortOptions: SelectOption[] = [
  { id: 'recently-created', label: 'Sort: recently created' },
  { id: 'recently-updated', label: 'Sort: recently updated' },
];

const Browse = ({ data }: Props) => {
  const [sortOption, setSortOption] = useState<SelectOption>(sortOptions[0]);
  const [search, setSearch] = useState<string | undefined>();

  console.log(data);

  const snippets = data.items;

  return (
    <Layout>
      <NextSeo title="Browse" />
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
                />
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <Icon.OutlineSearch className="h-5 w-5 text-gray-400" />
                </div>
              </div>
              <SelectInput
                className="w-1/5 cursor-pointer"
                options={sortOptions}
                value={sortOption}
                onChange={setSortOption}
              />
            </div>
            <div className="px-4 py-8 sm:px-0">
              <div className="space-y-6 min-h-96">
                {snippets.map((snippet) => (
                  <PublicSnippet key={snippet.id} snippet={snippet} />
                ))}
              </div>
              <div className="w-full flex justify-center mt-10 space-x-4">
                <Button className="bg-gray-200 w-auto items-center" color="white-gray">
                  <Icon.ChevronDoubleLeftIcon className="w-6 h-4" />
                  Previous
                </Button>
                <Button className="bg-gray-200 w-auto items-center" color="white-gray">
                  Next
                  <Icon.ChevronDoubleRightIcon className="w-6 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default Browse;
