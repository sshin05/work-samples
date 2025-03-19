import type { HTMLAttributes } from 'react';
import { vstack } from '@cerberus/styled-system/patterns';

type MainContentVStackProps = {
  children: React.ReactNode;
  gap?: string | number;
} & HTMLAttributes<HTMLDivElement>;

const MainContentVStack = ({ children, ...props }: MainContentVStackProps) => {
  const { gap = '16' } = props;

  return (
    <div
      className={vstack({
        w: 'full',
        h: 'full',
        gap,
        alignItems: 'start'
      })}
      {...props}
    >
      {children}
    </div>
  );
};

export default MainContentVStack;
