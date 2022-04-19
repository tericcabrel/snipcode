import type { NextPage } from 'next';
import withApollo from '@/utils/apollo';
import Board from '@/containers/private/board';

const BoardPage: NextPage = () => {
  return <Board />;
};

export default withApollo({ ssr: false })(BoardPage);
