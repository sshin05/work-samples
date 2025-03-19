import { styledTd } from '@/components_new/table/styles/react-table.styles';
import { Td, Tr } from '@cerberus/react';
import { css, cx } from '@cerberus/styled-system/css';
import { flexRender } from '@tanstack/react-table';

export const TableRow = ({ table, onRowClick = null }) => {
  return table.getRowModel().rows.map(row => (
    <Tr key={row.id}>
      {row.getVisibleCells().map(cell => {
        const dynamicStyles = css({
          cursor: onRowClick ? 'pointer' : 'default'
        });

        return (
          <Td
            key={String(cell.id)}
            className={cx(styledTd, dynamicStyles)}
            onClick={() => onRowClick?.(row.original)}
          >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </Td>
        );
      })}
    </Tr>
  ));
};
