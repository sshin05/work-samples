import type { ColumnDef } from '@tanstack/react-table';
import { styledMessageWrapper } from '../../../../styles/react-table.styles';
import { callToAction } from '../../../../table-utils/callToAction';

export const NoDataRow = (
  cachedColumns: ColumnDef<unknown, unknown>[],
  hasFiltersApplied: boolean,
  searchTerm: string,
  noDataMessage: React.ReactNode,
  loading: boolean
) => (
  <tr>
    <td colSpan={cachedColumns?.length}>
      <div className={styledMessageWrapper}>
        {!loading
          ? callToAction(hasFiltersApplied, noDataMessage, searchTerm)
          : ''}
      </div>
    </td>
  </tr>
);
