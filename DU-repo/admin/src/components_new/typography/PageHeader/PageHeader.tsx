import type { HTMLAttributes } from 'react';
import { type Styles, css } from '@cerberus/styled-system/css';

type PageHeaderProps = {
  children: React.ReactNode;
  css?: Styles;
} & HTMLAttributes<HTMLHeadingElement>;

export const PageHeader = ({ children, ...props }: PageHeaderProps) => {
  return (
    <h2
      className={css(
        {
          textStyle: 'h2',
          color: 'page.text.initial'
        },
        props.css || {}
      )}
      {...props}
    >
      {children}
    </h2>
  );
};
