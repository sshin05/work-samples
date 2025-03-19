import { Table as Tbl, Tbody } from '@cerberus/react';
import {
  styledTable,
  styledTableWrapper
} from '../../styles/react-table.styles';
import { NoDataRow } from './components/NoDataRow';
import type { TableProps } from './Table.types';
import { SkeletonRows } from './components/SkeletonRows';
import { TableRow } from './components/TableRow';
import { TableHeader } from './components/TableHeader';
import type { ColumnDef, Table as ReactTable } from '@tanstack/react-table';
import { cx } from '@cerberus/styled-system/css';

export const Table = ({
  columns: tableColumns,
  data: tableData,
  hasFiltersApplied,
  loading,
  noDataMessage = 'No Results Found',
  pageLoading = false,
  skeletonRows = 0,
  table,
  searchTerm,
  amountItemsSelected,
  removeProps,
  cancelProps,
  editProps,
  filterComponent,
  onRowClick,
  customStyle
}: TableProps<ColumnDef<unknown, unknown>>) => {
  const renderTableBody = () => {
    // SkeletonRows are not generally used, if you want them, pass in skeletonRows prop
    if ((loading || pageLoading) && skeletonRows > 0) {
      return (
        <SkeletonRows skeletonRows={skeletonRows} tableColumns={tableColumns} />
      );
    }

    if (tableData?.length > 0) {
      return (
        <TableRow
          onRowClick={onRowClick}
          table={table as unknown as ReactTable<unknown>}
        />
      );
    }

    return NoDataRow(
      tableColumns,
      hasFiltersApplied,
      searchTerm,
      noDataMessage,
      loading
    );
  };

  return (
    <div className={styledTableWrapper}>
      <Tbl caption="table" className={cx(styledTable, customStyle)}>
        <TableHeader
          amountItemsSelected={amountItemsSelected}
          cancelProps={cancelProps}
          removeProps={removeProps}
          table={table}
          editProps={editProps}
          filterComponent={filterComponent}
        />
        <Tbody decoration="zebra">{renderTableBody()}</Tbody>
      </Tbl>
    </div>
  );
};
