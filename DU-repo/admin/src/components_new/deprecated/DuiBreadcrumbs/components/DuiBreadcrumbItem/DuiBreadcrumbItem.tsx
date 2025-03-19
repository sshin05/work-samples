import React from 'react';
import Link from 'next/link';
import { StyledBreadcrumbItem } from './DuiBreadcrumbItem.styles';

interface BreadcrumbItemProps {
  active?: boolean;
  context?: 'light' | 'dark';
  href?: string;
  onClick?: () => void;
  text?: string | React.JSX.Element;
}

export const DuiBreadcrumbItem = ({
  href,
  text,
  context,
  active,
  ...rest
}: BreadcrumbItemProps) => {
  return active ? (
    <StyledBreadcrumbItem active={active} context={context} {...rest}>
      {text}
    </StyledBreadcrumbItem>
  ) : (
    <Link href={href} passHref legacyBehavior>
      <StyledBreadcrumbItem
        aria-current="page"
        context={context}
        active={false}
        {...rest}
      >
        {text}
      </StyledBreadcrumbItem>
    </Link>
  );
};
