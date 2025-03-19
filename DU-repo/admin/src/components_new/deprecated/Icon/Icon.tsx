import React from 'react';
import { Box } from '../../../components/Box';
import type { IconProps } from './Icon.types';

/**
 *
 * @deprecated
 *
 * The component has been deprecated in favor of the Cerberus component library and styling system.
 *
 */
export const Icon = ({
  name,
  size = 's',
  sx,
  role,
  className = '',
  ...props
}: IconProps) => {
  return (
    <Box
      role={role}
      className={`material-icons ${className}`}
      sx={{ fontSize: `icon.${size}`, ...sx }}
      {...props}
    >
      {name}
    </Box>
  );
};
