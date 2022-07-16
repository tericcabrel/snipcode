import { DocumentIcon } from '@heroicons/react/solid';

import { SnippetItem } from '../../../typings/components';
import { colors } from '../../../utils/constants';
import { truncate } from '../../../utils/text';

type Props = {
  item: SnippetItem;
  onClick: (snippet: SnippetItem) => void;
};

const FILE_NAME_MAX_LENGTH = 30;

const Snippet = ({ item, onClick }: Props) => {
  const charIndex = item.language.charCodeAt(0) - 65;
  const colorIndex = charIndex % colors.length;

  return (
    <div
      className="relative block pb-4 px-4 border border-gray-100 shadow-sm rounded-md cursor-default bg-white hover:bg-gray-100 transition"
      onClick={() => onClick(item)}
      title={item.name}
    >
      <div className="mt-4 text-gray-500 sm:pr-8 flex items-center">
        <DocumentIcon className="h-6 w-6 mr-2" style={{ color: colors[colorIndex] }} />
        <div className="text-sm font-bold text-gray-900">{truncate(item.name, FILE_NAME_MAX_LENGTH)}</div>
      </div>
    </div>
  );
};

export default Snippet;
