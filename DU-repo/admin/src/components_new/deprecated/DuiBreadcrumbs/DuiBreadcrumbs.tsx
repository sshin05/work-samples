import React from 'react';
import type { DuiBreadcrumbsProps } from './DuiBreadcumbs.types';
import { Divider, StyledNav } from './DuiBreadcrumbs.styles';
import { DuiBreadcrumbItem } from './components';

/**
 *
 * @deprecated
 *
 * The component has been deprecated in favor of the Cerberus component library and styling system.
 *
 */
export const DuiBreadcrumbs = ({
  paths,
  context = 'light',
  trailingSlash = false,
  highlightLast = true,
  ...rest
}: DuiBreadcrumbsProps) => (
  <StyledNav aria-label="breadcrumbs" {...rest}>
    {paths.map((path, index) => {
      return (
        <React.Fragment key={index}>
          <DuiBreadcrumbItem
            key={`breadCrumb_${index}`}
            href={path.href}
            text={path.text}
            context={context}
            active={highlightLast && index === paths.length - 1}
          />
          {index !== paths.length - 1 || trailingSlash ? (
            <Divider context={context}>/</Divider>
          ) : null}
        </React.Fragment>
      );
    })}
  </StyledNav>
);
