import { css, cx } from '@cerberus/styled-system/css';
import { type SkeletonPanelProps } from './SkeletonPanel.types';

export const SkeletonPanel = ({
  children,
  className,
  ...props
}: SkeletonPanelProps) => {
  const derivedClassName = cx(css({ w: 'full' }), className);
  return (
    <div
      aria-busy="true"
      aria-label="Loading Skeleton"
      {...props}
      className={derivedClassName}
    >
      {children}
    </div>
  );
};
