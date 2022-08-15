import { SnippetItem } from '../../../../typings/queries';

type Props = {
  snippet: SnippetItem;
};

const ViewSnippet = ({ snippet }: Props) => {
  console.log(snippet);

  return <div>Snippet</div>;
};

export { ViewSnippet };
