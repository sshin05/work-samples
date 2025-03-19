import React from 'react';
import Skeleton from 'react-loading-skeleton';
import type { BaseSkeletonProps } from './BaseSkeleton.types';

/**
 *
 * @deprecated
 *
 * BaseSkeleton is deprecated.  Find a cerberus `aria-busy="true"` compnonent to use instead.
 *
 */
export const BaseSkeleton = ({
  baseColor = '#FFFFFF',
  highlightColor = '#918EA7',
  ...props
}: BaseSkeletonProps) => {
  return (
    <Skeleton
      aria-label="Base Loading Skeleton"
      baseColor={baseColor}
      highlightColor={highlightColor}
      {...props}
    />
  );
};
