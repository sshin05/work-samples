import React from 'react';
import { css } from '@cerberus/styled-system/css';

type SideDrawerFooterProps = {
  children: React.ReactNode;
};
export const SideDrawerFooter = ({ children }: SideDrawerFooterProps) => {
  return (
    <div
      className={css({
        position: 'fixed',
        left: 0,
        bottom: 0,
        w: 'full',
        px: 8,
        py: 4,
        bg: 'page.surface.100',
        zIndex: 50,
        borderTopWidth: '1px',
        borderTopColor: 'page.border.initial',
        borderTopStyle: 'solid'
      })}
    >
      {children}
    </div>
  );
};
