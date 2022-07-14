import NextLink from 'next/link';
import { PropsWithChildren } from 'react';

import { ExternalLink } from './external-link';

type Props = PropsWithChildren<any>;

const Link = ({ children, ...props }: Props) => {
  if (props.href.toString().startsWith('/')) {
    return <NextLink {...props}>{children}</NextLink>;
  }

  return <ExternalLink child={children} href={props.href.toString()} />;
};

export default Link;
