import type { BoxProps } from 'theme-ui';

export interface IBox extends BoxProps {
  'aria-modal'?: 'true' | 'false';
  className?: string;
  end?: number | number[];
  span?: number;
  start?: number;
}
