import NextLink, { LinkProps } from 'next/link';
import { PropsWithChildren } from 'react';

type Props = PropsWithChildren<LinkProps & { className?: string }>;

const Link = ({ children, ...props }: Props) => {
  if (props.href.toString().startsWith('/')) {
    return <NextLink {...props}>{children}</NextLink>;
  }

  return (
    <a href={props.href.toString()} rel="noopener noreferrer" target="_blank">
      {children}
    </a>
  );
};

export { Link };
