import React from 'react';
import { Heading as BaseHeading } from 'theme-ui';
import Divider from '../../../components/divider/divider';
import type { HeadingProps } from './Heading.types';

/**
 *
 * @deprecated
 *
 * The component has been deprecated in favor of the Cerberus component library and styling system.
 *
 */
export const Heading = ({
  as = 'h1',
  context = 'dark',
  hasEyebrow = false,
  ...props
}: HeadingProps) => {
  const color = context === 'light' ? 'slateGray' : 'white';

  const Eyebrow = () => {
    return (
      <Divider
        sx={{
          width: '44px',
          height: '3px',
          color: '#00f7b8',
          mb: ['s', 'm'],
          borderWidth: '3px'
        }}
      />
    );
  };

  return (
    <>
      {hasEyebrow && <Eyebrow />}
      <BaseHeading
        as={as}
        variant={`heading.${as.toString()}`}
        color={color}
        {...props}
      />
    </>
  );
};
