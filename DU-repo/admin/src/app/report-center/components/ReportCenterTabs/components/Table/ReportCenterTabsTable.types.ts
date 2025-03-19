import type {
  GetUserDownloadsQuery,
  GetUserUploadsQuery
} from '@/api/codegen/graphql';

export type Columns = 'download' | 'upload';
type TableRows =
  | GetUserDownloadsQuery['getUserDownloads']
  | GetUserUploadsQuery['getUserUploads'];

export type ReportCenterTabsTableProps = {
  /** Rows can contain any object structure, the data will automatically be displayed in the correct column if the Table column data structure is configured as expected */
  rows: TableRows;
  loading: boolean;
  onDelete: (id: string) => Promise<void>;
  type: Columns;
};
