'use client';
import { css } from '@cerberus/styled-system/css';

import type { JSX } from 'react';

type Props = {
  /** The title of the tab content. */
  title: string;
  /** The main content. */
  children: React.ReactNode;
};

/**
 * Renders a tab content section with a title and children.
 *
 * @returns {JSX.Element}
 *
 * @example
 * <TabContent title="Categories">
 *   <p>Associated category content...</p>
 * </TabContent>
 */
export function TabContent({ title, children }: Props): JSX.Element {
  return (
    <div className={css({ mt: '6' })}>
      <h2
        className={css({
          textStyle: 'h4',
          color: 'page.text.initial',
          mb: '8'
        })}
      >
        {title}
      </h2>
      <div>{children}</div>
    </div>
  );
}
