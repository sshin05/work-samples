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
        w: '100%',
        pl: '16',
        pr: '4',
        py: '12',
        bg: 'acheron.neutral.90',
        borderTop: '1px solid transparent',
        borderImageSource:
          'linear-gradient(216.03deg, #F7DCB7 -4.93%, #ECA64B 116.78%)',
        borderImageSlice: 1,
        zIndex: 50
      })}
    >
      {children}
    </div>
  );
};
