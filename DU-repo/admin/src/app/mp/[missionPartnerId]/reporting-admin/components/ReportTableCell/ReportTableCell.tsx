import { css } from '@cerberus/styled-system/css';
import { type ReportTableCellProps } from './ReportTableCell.types';

export const ReportTableCell = ({
  onClick,
  cellDisplayText
}: ReportTableCellProps) => {
  return (
    <button
      onClick={onClick}
      className={css({
        color: 'action.text.200',
        textStyle: 'link',
        textAlign: 'left'
      })}
    >
      {cellDisplayText}
    </button>
  );
};
