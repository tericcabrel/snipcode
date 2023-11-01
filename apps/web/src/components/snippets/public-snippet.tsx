import { Link } from '@snipcode/front/components/link';
import { UserAvatar } from '@snipcode/front/components/user-avatar';
import { PublicSnippetResult } from '@snipcode/front/typings/queries';

type Props = {
  snippet: PublicSnippetResult['items'][number];
};

const PublicSnippet = ({ snippet }: Props) => {
  const { user } = snippet;

  const htmlCode = snippet.content;

  return (
    <div className="rounded-md border border-gray-300 shadow-sm rounded p-3 bg-gray-50">
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
      </div>
      <div className="ml-12">{snippet.description}</div>
      <div
        className="code-snippet-view code-snippet-preview mt-3 relative w-full overflow-auto"
        dangerouslySetInnerHTML={{
          __html: htmlCode,
        }}
      />
    </div>
  );
};

export { PublicSnippet };
