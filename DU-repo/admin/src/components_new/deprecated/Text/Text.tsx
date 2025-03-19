import React from 'react';
import { Text as BaseText } from 'theme-ui';

interface TextProps {
  children?: React.ReactNode;
  context?: 'dark' | 'light';
  onClick?: () => void;
  size?: 's' | 'm' | 'l';
  sx?: Record<string, unknown>;
}

/**
 *
 * @deprecated
 *
 * The component has been deprecated in favor of the Cerberus component library and styling system.
 *
 */
export const Text = ({ size = 'm', context = 'dark', ...props }: TextProps) => {
  const color = context === 'light' ? 'slateGray' : 'white';
  return <BaseText variant={`paragraph.${size}`} color={color} {...props} />;
};
