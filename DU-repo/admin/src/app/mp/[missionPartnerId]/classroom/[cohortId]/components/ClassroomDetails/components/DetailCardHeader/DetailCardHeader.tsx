import { css } from '@cerberus/styled-system/css';
import { flex } from '@cerberus/styled-system/patterns';
import React from 'react';

export const DetailCardHeader = ({
  children
}: {
  children: React.ReactNode;
}) => {
  return (
    <div
      className={flex({
        alignItems: 'center',
        flexWrap: 'wrap'
      })}
    >
      <h3 className={css({ textStyle: 'h5' })}>Details</h3>
      {children}
    </div>
  );
};
