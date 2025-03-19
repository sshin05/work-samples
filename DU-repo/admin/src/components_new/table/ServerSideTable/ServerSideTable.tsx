import React, { useEffect, useMemo, useState } from 'react';
import type { ServerSideTableProps } from './ServerSideTable.types';
import { Table } from '../components/Table';
import {
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type PaginationState
} from '@tanstack/react-table';
import { Footer } from '../components/Footer';
import { SearchToolbar } from '../components/SearchToolbar';
import { styledTableContainer } from '../styles/react-table.styles';

const STATIC_ARRAY = [];

export const ServerSideTable = ({
  columns: tableColumns,
  data: tableData,
  hasFiltersApplied = false,
  loading,
  noDataMessage = 'No Results Found',
  page,
  setPage,
  setSorting,
  sorting = [],
  size,
  skeletonRows = 0,
  total,
  // toolbar props
  amountItemsSelected,
  buttonProps,
  secondaryButtonProps,
  cancelProps,
  children,
  downloadProps,
  editProps,
  filterProps,
  hasToolbar = true,
  removeProps,
  searchPlaceholder,
  setSearchTerm,
  searchTerm,
  toolbarType = 'search',
  filterComponent,
  onRowClick,
  customStyle
}: ServerSideTableProps<ColumnDef<unknown, unknown>>) => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: page - 1,
    pageSize: size
  });

  useEffect(() => {
    setPagination({
      pageIndex: page - 1,
      pageSize: size
    });
  }, [page, size]);

  useEffect(() => {
    setPage(pagination.pageIndex + 1);
  }, [pagination.pageIndex, setPage]);

  const columns: Array<ColumnDef<unknown, unknown>> = useMemo(
    (): typeof tableColumns => tableColumns || STATIC_ARRAY,
    [tableColumns]
  );

  const table = useReactTable({
    columns: columns,
    data: tableData,
    state: {
      sorting,
      globalFilter: searchTerm,
      pagination
    },
    onGlobalFilterChange: setSearchTerm,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    enableMultiSort: false,
    manualPagination: true,
    manualSorting: true,
    pageCount: Math.ceil(total / size)
  });

  return (
    <div className={styledTableContainer}>
      <>
        <SearchToolbar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          searchPlaceholder={searchPlaceholder}
          buttonProps={buttonProps}
          secondaryButtonProps={secondaryButtonProps}
          editProps={editProps}
          filterProps={filterProps}
          toolbarType={toolbarType}
          hasToolbar={hasToolbar}
          downloadProps={downloadProps}
        />
        {filterProps && children}
      </>
      <Table
        columns={tableColumns}
        data={tableData}
        hasFiltersApplied={hasFiltersApplied}
        loading={loading}
        noDataMessage={noDataMessage}
        table={table}
        searchTerm={searchTerm}
        editProps={editProps}
        removeProps={removeProps}
        cancelProps={cancelProps}
        amountItemsSelected={amountItemsSelected}
        skeletonRows={skeletonRows}
        filterComponent={filterComponent}
        onRowClick={onRowClick}
        customStyle={customStyle}
      />
      <Footer
        tableData={tableData}
        table={table}
        totalItems={total}
        searchTerm={searchTerm}
      />
    </div>
  );
};
