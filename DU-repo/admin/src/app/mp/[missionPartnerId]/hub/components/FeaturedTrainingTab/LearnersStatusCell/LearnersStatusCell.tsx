import { css } from '@cerberus/styled-system/css';
import { useResponsiveWidth } from '../hooks/useResponsiveWidth';
import { ProgressIndicator } from '../ProgressIndicator';
import type { OriginalRow } from './LearnersStatusCell.types';

const DEFAULT_CELL_WIDTH = 240;

export const LearnersStatusCell = ({ original }: { original: OriginalRow }) => {
  const { assigned, inProgress, stopped, completed } = original;

  const { ref: cellRef, width: cellWidth } = useResponsiveWidth(
    DEFAULT_CELL_WIDTH,
    90
  );

  return (
    <div ref={cellRef} className={css({ w: 'full', maxW: '40rem' })}>
      <ProgressIndicator
        assigned={assigned}
        inProgress={inProgress}
        stopped={stopped}
        completed={completed}
        containerWidth={cellWidth}
      />
    </div>
  );
};
