import type { HTMLAttributes } from 'react';
import { box } from '@cerberus/styled-system/patterns';

type ContentAreaProps = {
  children: React.ReactNode;
} & HTMLAttributes<HTMLDivElement>;

// actually, after I see this, it looks like child content areas have a white background, so this might be the wrong approach.
const ContentArea = ({ children, ...props }: ContentAreaProps) => {
  return (
    <div
      className={box({
        w: 'full',
        h: 'full'
      })}
      {...props}
    >
      {children}
    </div>
  );
};

export default ContentArea;
