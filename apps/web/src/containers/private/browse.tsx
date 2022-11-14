import { PublicSnippetResult } from '@sharingan/front';
import { NextSeo } from 'next-seo';

import Layout from '@/components/layout/private/layout';
import { PublicSnippet } from '@/components/snippets/public-snippet';

type Props = {
  data: PublicSnippetResult;
};

const Browse = ({ data }: Props) => {
  console.log(data);

  const snippets = data.items;

  return (
    <Layout>
      <NextSeo title="Browse" />
      <div className="py-10">
        <header>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-tight text-gray-900">Browse</h1>
          </div>
        </header>
        <main>
          <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
            <div className="px-4 py-8 sm:px-0">
              <div className="space-y-6 min-h-96">
                {snippets.map((snippet) => (
                  <PublicSnippet key={snippet.id} snippet={snippet} />
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default Browse;
