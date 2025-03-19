import React from 'react';
import { Box as BaseBox } from 'theme-ui';
import type { IBox } from './Box.types';

/**
 *
 * @deprecated
 *
 * The component has been deprecated in favor of the Cerberus component library and styling system.
 *
 */
export const Box = ({ start, end, span, sx, ...props }: IBox) => {
  return (
    <BaseBox
      sx={{
        gridColumnStart: start,
        gridColumnEnd: span ? `span ${span}` : end,
        ...sx
      }}
      {...props}
    />
  );
};
