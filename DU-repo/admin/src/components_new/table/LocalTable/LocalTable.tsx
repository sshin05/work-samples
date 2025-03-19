'use client';

import { useMemo, useState } from 'react';
import { Table } from '../components/Table';
import type { LocalTableProps } from './LocalTable.types';
import {
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type PaginationState
} from '@tanstack/react-table';
import { Footer } from '../components/Footer';
import { SearchToolbar } from '../components/SearchToolbar';
import { css } from '@cerberus/styled-system/css';

const STATIC_ARRAY = [];

export const LocalTable = ({
  columns: tableColumns,
  data: tableData,
  defaultSorting,
  hasFiltersApplied,
  loading,
  noDataMessage = 'No Results Found',
  pageLoading = false,
  skeletonRows = 0,
  //toolbar props
  amountItemsSelected,
  buttonProps,
  cancelProps,
  children,
  downloadProps,
  editProps,
  filterProps,
  hasToolbar = true,
  searchPlaceholder,
  removeProps,
  toolbarType = 'search',
  filterComponent,
  pageSize = 25
}: LocalTableProps<ColumnDef<unknown, unknown>>) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sorting, setSorting] = useState(defaultSorting);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: pageSize
  });

  const columns: Array<ColumnDef<unknown, unknown>> = useMemo(
    (): typeof tableColumns => tableColumns || STATIC_ARRAY,
    [tableColumns]
  );

  const filteredData = useMemo(() => {
    if (!searchTerm) return tableData || [];

    // Placed inside useMemo to avoid re-creating the set on every render
    const excludedKeys = new Set([
      'id',
      'vendorId',
      'courseId',
      'userId',
      'missionPartnerId',
      'licenseId'
    ]);

    return (tableData || []).filter(item => {
      return Object.entries(item).some(([key, value]) => {
        if (typeof value === 'boolean' || excludedKeys.has(key)) return false;
        const stringValue = String(value).toLowerCase();
        const searchTermLower = searchTerm.toLowerCase();
        const isPotentialId =
          stringValue.includes('-') && stringValue.length === 36; // 36 is the length of a UUID
        const isDate = !isNaN(Date.parse(stringValue));
        if (isPotentialId || isDate) return false;
        const includesSearchTerm = stringValue.includes(searchTermLower);
        return includesSearchTerm;
      });
    });
  }, [searchTerm, tableData]);

  const table = useReactTable({
    columns,
    data: filteredData,
    state: {
      sorting,
      globalFilter: searchTerm,
      pagination
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setSearchTerm,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    enableMultiSort: false
  });

  return (
    <div className={css({ w: 'full' })}>
      <>
        <SearchToolbar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          searchPlaceholder={searchPlaceholder}
          buttonProps={buttonProps}
          editProps={editProps}
          filterProps={filterProps}
          toolbarType={toolbarType}
          hasToolbar={hasToolbar}
          downloadProps={downloadProps}
        />
        {filterProps && children}
      </>
      <Table
        editProps={editProps}
        removeProps={removeProps}
        cancelProps={cancelProps}
        amountItemsSelected={amountItemsSelected}
        columns={tableColumns}
        data={filteredData}
        hasFiltersApplied={hasFiltersApplied}
        loading={loading}
        noDataMessage={noDataMessage}
        pageLoading={pageLoading}
        searchTerm={searchTerm}
        skeletonRows={skeletonRows}
        table={table}
        filterComponent={filterComponent}
      />
      <Footer
        tableData={filteredData}
        table={table}
        totalItems={filteredData?.length}
        searchTerm={searchTerm}
      />
    </div>
  );
};
