import React from 'react';
import { Breadcrumb } from './components/Breadcrumb/Breadcrumb';
import type { BreadcrumbsProps } from './Breadcrumbs.types';
import { css } from '@cerberus/styled-system/css';

export const Breadcrumbs = ({ breadcrumbs, loading }: BreadcrumbsProps) => (
  <nav aria-label="breadcrumbs">
    {breadcrumbs?.map((breadcrumb, index) => {
      const isLastIndex = index === breadcrumbs.length - 1;

      const textColor = isLastIndex
        ? 'action.text.200'
        : 'action.navigation.initial';

      const divider = isLastIndex || loading ? '' : ' / ';

      return (
        <span
          aria-busy={loading}
          key={`breadcrumb-${index}`}
          className={css({
            color: textColor
          })}
        >
          <Breadcrumb breadcrumb={breadcrumb} displayAsText={isLastIndex} />
          {divider}
        </span>
      );
    })}
  </nav>
);
