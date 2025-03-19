import type { css } from '@cerberus/styled-system/css';
import type { Row, Table } from '@tanstack/react-table';
import type React from 'react';

export interface TableProps<ColumnDef> {
  columns: ColumnDef[];
  data: unknown[];
  hasFiltersApplied?: boolean;
  loading?: boolean;
  noDataMessage?: React.ReactNode;
  pageLoading?: boolean;
  skeletonRows?: number;
  table?: Table<unknown>;
  searchTerm?: string;
  amountItemsSelected?: number;
  editProps?: unknown;
  removeProps?: unknown;
  cancelProps?: unknown;
  isPortalProps?: unknown;
  filterComponent?: React.ReactNode;
  onRowClick?: (row: Row<unknown>) => void;
  customStyle?: ReturnType<typeof css>;
}
