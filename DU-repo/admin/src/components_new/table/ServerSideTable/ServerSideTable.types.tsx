/**
 * ServerSideTable
 * Description: Server controlled table component using a cursor to fetch more data as the user scrolls down the table (infinite scroll).
 * Docs: https://tanstack.com/table/v8
 * @param {Array} columns -- Array of column objects
 * @param {Array} data -- Array of data objects
 * @param {Number} count -- Number -- total number of server records available (not just the current page/rows)
 * @param {Function} fetchNextPage -- Function -- fetch more data.
 * @param {Number} fetchPoint -- Number -- Number to adjust when more pages are fetched as the user scrolls down the table.  Default is 200. Increase this number to fetch more pages earlier in the table scroll.
 * @param {String} hasMoreCursor -- String -- cursor to fetch next page of data. When the cursor is null or empty string, there is no more data to fetch.
 * @param {Boolean} loading -- Boolean -- Boolean to indicate if data is loading
 * @param {String} noDataMessage -- String -- Message to display when no data is retrieved (e.g. records.length === 0)
 * @param {Boolean} responsive -- Boolean -- Boolean to indicate if table should be responsive.  Default is true.
 * @param {Function} setSorting -- Function -- Function to set sorting state.  Note this should set the calling component sorting state and call the api to update/retrieve new data set
 * @param {Array} sorting -- Array -- Array of sorting objects: [{ id: '<data field key>', desc: true }].  Enabled by default.  To disable, set column definition to include: enableSorting: false
 * @param {Number} tableHeight -- Number -- Height of the table (not including toolbar).  Default is 600px which will usually map to 10 rows.
 * toolbar props
 * @param {Object} buttonProps -- Object -- Props to pass to the toolbar button
 * @param {Object} cancelProps -- Object -- Props to pass to the toolbar cancel button
 * @param {ReactNode} children -- ReactNode -- Toolbar children.  Normally used to pass in a filters
 * @param {Object} downloadProps -- Object -- Props to pass to the toolbar download button
 * @param {Object} editProps -- Object -- Props to pass to the toolbar edit button
 * @param {Object} filterProps -- Object -- Props to pass to the toolbar filter button
 * @param {Boolean} hasToolbar -- Boolean -- Boolean to indicate if toolbar should be rendered
 * @param {Boolean} isPortalProps -- Boolean -- Boolean to indicate if toolbar should be rendered as a portal
 * @param {Object} removeProps -- Object -- Props to pass to the toolbar remove button
 * @param {String} loadingMessage -- String -- Message to display when loading
 * @param {String} searchTerm -- String -- Search term
 * @param {Function} setSearchTerm -- Function -- Function to set search term state.  Note this should set the calling component search term state and call the api to update/retrieve new data set
 * @param {String} searchPlaceholder -- String -- Placeholder text for search input
 * @param {String} toolbarType -- String -- Type of toolbar to render.  Default is 'search'.  Options are 'search', 'edit'
 * @returns {ReactComponent}
 */

import type { css } from '@cerberus/styled-system/css';
import type { Row, SortingState } from '@tanstack/react-table';

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
  onDownload: () => void;
}

type DownloadProps = DownloadProp | DownloadProp[];

interface FilterProps {
  openFilters?: boolean;
  setOpenFilters?: (value: boolean) => void;
}
export interface ServerSideTableProps<ColumnDef> {
  columns: ColumnDef[];
  data: unknown[];
  hasFiltersApplied?: boolean;
  loading?: boolean;
  noDataMessage?: React.ReactNode;
  page?: number;
  setPage?: (page: number) => void;
  setSorting?: (sorting: SortingState) => void;
  sorting?: SortingState;
  size?: number;
  skeletonRows?: number;
  total?: number;
  // toolbar props
  amountItemsSelected?: number;
  buttonProps?: ButtonProps;
  secondaryButtonProps?: ButtonProps;
  cancelProps?: CancelProps;
  children?: React.ReactNode;
  downloadProps?: DownloadProps;
  editProps?: EditProps;
  filterProps?: FilterProps;
  hasToolbar?: boolean;
  removeProps?: RemoveProps;
  searchPlaceholder?: string;
  setSearchTerm?: (term?: string) => void;
  searchTerm?: string;
  toolbarType?: string;
  filterComponent?: React.ReactNode;
  onRowClick?: (row: Row<unknown>) => void;
  customStyle?: ReturnType<typeof css>;
}
