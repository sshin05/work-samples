import React from 'react';
import { Flex as BaseFlex } from 'theme-ui';
import type { FlexProps } from './Flex.types';

/**
 *
 * @deprecated
 *
 * The component has been deprecated in favor of the Cerberus component library and styling system.
 *
 */
export const Flex = ({ start, end, span, sx, ...props }: FlexProps) => {
  return (
    <BaseFlex
      sx={{
        gridColumnStart: start,
        gridColumnEnd: span ? `span ${span}` : end,
        ...sx
      }}
      {...props}
    />
  );
};
