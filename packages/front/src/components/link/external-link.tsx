import { cloneElement, isValidElement } from 'react';

type Props = {
  child: HTMLAnchorElement;
  href: string;
};

export const ExternalLink = ({ child, href }: Props) => {
  if (!isValidElement<HTMLAnchorElement>(child)) {
    throw new Error('Child must be a valid React element');
  }
  if (child.type !== 'a') {
    throw new Error('Child must be an <a> element');
  }

  return cloneElement(child, {
    href,
    rel: 'noopener noreferrer',
    target: '_blank',
  });
};
