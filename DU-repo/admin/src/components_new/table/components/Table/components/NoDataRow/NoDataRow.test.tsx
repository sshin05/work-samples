import { renderV3, screen } from '@@/test-utils';
import { NoDataRow } from './NoDataRow';
import { callToAction } from '../../../../table-utils/callToAction';
import { mockColumns } from '../../../../table-utils/mocks';

jest.mock('../../../../table-utils/callToAction', () => ({
  callToAction: jest.fn()
}));

describe('NoDataRow', () => {
  it('renders no data message correctly', () => {
    const searchTerm = 'test';
    const noDataMessage = 'No data available';
    const hasFiltersApplied = true;
    const loading = false;

    (callToAction as jest.Mock).mockReturnValue(noDataMessage);

    renderV3(
      <table>
        <tbody>
          {NoDataRow(
            mockColumns,
            hasFiltersApplied,
            searchTerm,
            noDataMessage,
            loading
          )}
        </tbody>
      </table>
    );

    expect(screen.getByText(noDataMessage)).toBeInTheDocument();
    expect(callToAction).toHaveBeenCalledWith(
      hasFiltersApplied,
      noDataMessage,
      searchTerm
    );
  });

  it('does not render no data message when loading', () => {
    const searchTerm = 'test';
    const noDataMessage = 'No data available';
    const hasFiltersApplied = true;
    const loading = true;

    (callToAction as jest.Mock).mockReturnValue(noDataMessage);

    renderV3(
      <table>
        <tbody>
          {NoDataRow(
            mockColumns,
            hasFiltersApplied,
            searchTerm,
            noDataMessage,
            loading
          )}
        </tbody>
      </table>
    );

    expect(screen.queryByText(noDataMessage)).not.toBeInTheDocument();
  });
});
