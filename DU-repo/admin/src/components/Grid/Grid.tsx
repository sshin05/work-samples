import React from 'react';
import { Grid as BaseGrid } from 'theme-ui';
import type { GridProps } from './Grid.types';

/**
 *
 * @deprecated
 *
 * The component has been deprecated in favor of the Cerberus component library and styling system.
 *
 * A grid component that uses the `Grid` component from the `theme-ui` library.
 * @param {Object} props - The props object.
 * @param {number|number[]} [props.columns=[4, 8, 12]] - The number of columns in the grid.
 * @param {number|number[]} [props.gap=15] - The gap between grid items.
 * @param {boolean} [props.isBody=false] - Whether the grid is used in the body of the page.
 * @param {Object} [props.sx] - The sx prop from `theme-ui`.
 * @returns {JSX.Element} - The rendered `Grid` component.
 */
export const Grid = ({ sx, isBody, ...props }: GridProps) => {
  return isBody ? (
    <BaseGrid
      sx={{
        width: ['calc(100% - 30px)', '737px', '1275px'],
        marginLeft: 'auto',
        marginRight: 'auto',
        ...sx
      }}
      {...props}
    />
  ) : (
    <BaseGrid
      sx={{
        width: ['100%', '737px', '1275px'],
        marginLeft: 'auto',
        marginRight: 'auto',
        ...sx
      }}
      {...props}
    />
  );
};
