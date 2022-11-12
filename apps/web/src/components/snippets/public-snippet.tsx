import { Link, PublicSnippetResult, UserAvatar } from '@sharingan/front';

type Props = {
  snippet: PublicSnippetResult['items'][number];
};

export const PublicSnippet = ({ snippet }: Props) => {
  const { user } = snippet;

  const htmlCode = snippet.content;

  return (
    <div className="rounded-md border border-gray-300 shadow-sm rounded p-3 bg-white">
      <div className="flex justify-between w-full">
        <div className="flex items-center">
          <div>
            <Link href={`/users/${user.username}`}>
              <a>
                <UserAvatar name={user?.username} url={user?.pictureUrl} />
              </a>
            </Link>
          </div>
          <div className="ml-2">
            <div className="font-bold">
              <Link href={`/users/${user.username}`}>
                <a>{user.username}</a>
              </Link>{' '}
              /{' '}
              <Link href={`/snippets/${snippet.id}`}>
                <a>{snippet.name}</a>
              </Link>
            </div>
            <div className="text-xs text-gray-400">{snippet.createdAt}</div>
          </div>
        </div>
        <div>
          <button
            className="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50"
            type="button"
          >
            0 Stars
          </button>
        </div>
      </div>
      <div className="ml-12">{snippet.description}</div>
      <div>
        <pre
          dangerouslySetInnerHTML={{
            __html: htmlCode,
          }}
        ></pre>
      </div>
    </div>
  );
};
