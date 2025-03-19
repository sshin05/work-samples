import React from 'react';
import { Button as BaseButton } from 'theme-ui';
import type { ButtonProps } from './Button.types';

/**
 *
 * @deprecated
 *
 * The component has been deprecated in favor of the Cerberus component library and styling system.
 *
 */
export const Button = ({
  context = 'dark',
  type = 'primary',
  onClick = undefined,
  ...props
}: ButtonProps) => {
  const variant = `${context}${type.charAt(0).toUpperCase()}${type.slice(1)}`;
  return <BaseButton variant={variant} onClick={onClick} {...props} />;
};
