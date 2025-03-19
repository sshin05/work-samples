import React from 'react';
import { css } from '@cerberus/styled-system/css';

export const DetailCard = ({
  children,
  width,
  isLoading
}: {
  children: React.ReactNode;
  isLoading?: boolean;
  width: string;
}) => {
  return (
    <div
      aria-busy={isLoading}
      className={css({
        display: 'flex',
        flexDirection: 'column',
        p: '6',
        gap: '6',
        borderRadius: 'lg',
        bg: 'page.surface.100',
        boxShadow:
          '0px 2px var(--md, 16px) 0px var(--drop-shadow-sm, rgba(22, 1, 38, 0.15))',
        w: width,
        flexShrink: 0
      })}
    >
      {children}
    </div>
  );
};
