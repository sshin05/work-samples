import { grid } from '@cerberus/styled-system/patterns';

import type { JSX } from "react";

/**
 * A grid layout component for rendering a list of programs.
 *
 * @returns {JSX.Element}
 *
 * @example
 * <ProgramList>
 *   <ProgramLink ... />
 *   <ProgramLink ... />
 * </ProgramList>
 */
export const ProgramList = ({
  children
}: {
  children: React.ReactNode;
}): JSX.Element => {
  return (
    <div
      className={grid({
        justifyContent: 'flex-start',
        gridTemplateColumns: 'repeat(4, auto)',
        gap: { base: '1rem', lg: '2rem' },
        mb: '8'
      })}
    >
      {children}
    </div>
  );
};
