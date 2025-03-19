import React from 'react';
import { Td, Th, Thead, Tr } from '@cerberus/react';
import { css } from '@cerberus/styled-system/css';
import {
  activeSortedColumn,
  notSortableTableHeadCell,
  styledArrowWrapper,
  styledTableHead,
  styledTableHeadCell,
  styledTableHeadRow,
  styledTd
} from '../../../../styles/react-table.styles';
import { ArrowsVertical, SortAscending, SortDescending } from '@cerberus/icons';
import { flexRender } from '@tanstack/react-table';
import { EditToolbar } from '@/components_new/table/components/Table/components/EditToolbar';
import { styledEditToolbarContainer } from '@/components_new/table/styles/toolbar-styles';

export const TableHeader = ({
  table,
  amountItemsSelected,
  removeProps,
  cancelProps,
  editProps,
  filterComponent
}) => {
  return (
    <>
      <Thead className={styledTableHead}>
        {table.getHeaderGroups().map((headerGroup, index) => (
          <React.Fragment key={headerGroup.id || index}>
            <Tr key={`toolbar-${headerGroup.id || index}`} className={styledTd}>
              <Td
                colSpan={headerGroup.headers.length}
                style={{ borderTop: 0, padding: 0 }}
              >
                {filterComponent && <div>{filterComponent}</div>}
                {editProps && (
                  <div className={styledEditToolbarContainer}>
                    <EditToolbar
                      amountItemsSelected={amountItemsSelected}
                      removeProps={removeProps}
                      cancelProps={cancelProps}
                      editProps={editProps}
                    />
                  </div>
                )}
              </Td>
            </Tr>

            <Tr className={styledTableHeadRow} key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                const enableSorting =
                  header.column.columnDef.enableSorting ?? true;
                return (
                  <Th
                    className={`${enableSorting ? styledTableHeadCell : notSortableTableHeadCell} ${header.column.getIsSorted() ? activeSortedColumn : ''}`}
                    key={header.id}
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        {...{
                          className: header.column.getCanSort()
                            ? 'cursor-pointer select-none'
                            : '',
                          onClick: header.column.getToggleSortingHandler()
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: (
                            <div
                              className={styledArrowWrapper}
                              aria-label="Sort Ascending"
                            >
                              <SortAscending />
                            </div>
                          ),
                          desc: (
                            <div
                              className={styledArrowWrapper}
                              aria-label="Sort Descending"
                            >
                              <SortDescending />
                            </div>
                          )
                        }[header.column.getIsSorted() || 0] ??
                          (header.column.getCanSort() && (
                            <span
                              aria-label="Sortable Column"
                              id="arrowsVertical"
                              className={css({
                                float: 'right',
                                visibility: 'hidden'
                              })}
                            >
                              <ArrowsVertical />
                            </span>
                          ))}
                      </div>
                    )}
                  </Th>
                );
              })}
            </Tr>
          </React.Fragment>
        ))}
      </Thead>
    </>
  );
};
