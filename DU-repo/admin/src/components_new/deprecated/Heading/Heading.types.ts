import type { ElementType } from 'react';

export type HeadingProps = {
  as?: ElementType;
  children?: React.ReactNode;
  color?: string;
  context?: string;
  eyebrowText?: string;
  hasEyebrow?: boolean;
  onClick?: () => void;
  sx?: Record<string, unknown>;
};
