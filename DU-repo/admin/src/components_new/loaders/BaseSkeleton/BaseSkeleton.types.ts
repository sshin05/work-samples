import type { SkeletonProps } from 'react-loading-skeleton';

export type BaseSkeletonProps = SkeletonProps & {
  baseColor?: string;
  highlightColor?: string;
  width?: string | number;
  height?: string | number;
  style?: Record<string, unknown>;
};
