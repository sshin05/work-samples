import type { SortingState } from '@tanstack/react-table';

export type TableCellProps = {
  getContext(): () => void;
  id: string;
  column: {
    columnDef: {
      cell?: unknown;
      hideOverflow?: boolean;
    };
  };
};
interface ButtonProps {
  buttonIcon?: React.ReactNode;
  buttonContent?: string;
  onButtonClick?: () => void;
}
interface EditProps {
  showEdit?: boolean;
  setShowEdit?: (value: boolean) => void;
  bulkAction?: () => void;
  disableEdit?: boolean;
  itemLabel?: string;
}
interface RemoveProps {
  disabled?: boolean;
  buttonText?: string;
  buttonIcon?: React.ReactNode;
  onButtonClick?: () => void;
}
interface CancelProps {
  buttonText?: string;
  onButtonClick?: () => void;
}
interface DownloadProp {
  name?: string;
  onDownload?: () => void;
  loading?: boolean;
}

type DownloadProps = DownloadProp | DownloadProp[];

interface FilterProps {
  openFilters?: boolean;
  setOpenFilters?: (value: boolean) => void;
}
export interface LocalTableProps<ColumnDef> {
  columns: ColumnDef[];
  data: unknown[];
  defaultSorting?: SortingState;
  hasFiltersApplied?: boolean;
  loading?: boolean;
  noDataMessage?: React.ReactNode;
  pageLoading?: boolean;
  skeletonRows?: number;
  // toolbar props
  amountItemsSelected?: number;
  buttonProps?: ButtonProps;
  cancelProps?: CancelProps;
  children?: React.ReactNode;
  downloadProps?: DownloadProps;
  editProps?: EditProps;
  filterProps?: FilterProps;
  hasToolbar?: boolean;
  isPortalProps?: boolean;
  removeProps?: RemoveProps;
  searchPlaceholder?: string;
  toolbarType?: string;
  filterComponent?: React.ReactNode;
  pageSize?: number;
}
