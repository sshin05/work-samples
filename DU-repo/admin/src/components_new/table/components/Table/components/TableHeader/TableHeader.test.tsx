import { renderV3, screen } from '@@/test-utils';
import { TableHeader } from './TableHeader';
import { mockColumns } from '../../../../table-utils/mocks';

const mockTable = {
  getHeaderGroups: jest.fn(() => [
    {
      id: 'headerGroup1',
      headers: mockColumns.map(column => ({
        id: column.id,
        isPlaceholder: false,
        getSize: jest.fn(() => '100px'),
        getContext: jest.fn(() => ({})),
        render: jest.fn(() => column.header),
        column: {
          getCanSort: jest.fn(() => true),
          getToggleSortingHandler: jest.fn(),
          getIsSorted: jest.fn(() => false),
          columnDef: {
            header: column.header
          }
        }
      }))
    }
  ])
};

const mockProps = {
  table: mockTable,
  loading: false,
  pageLoading: false,
  removeProps: null,
  cancelProps: null,
  isPortalProps: null,
  editProps: null,
  amountItemsSelected: null,
  filterComponent: null
};

describe('TableHeader', () => {
  test('renders table headers', () => {
    renderV3(<TableHeader {...mockProps} />);
    expect(screen.getByText('First Name')).toBeInTheDocument();
    expect(screen.getByText('Last Name')).toBeInTheDocument();
    expect(screen.getByText('Email Address')).toBeInTheDocument();
  });
});
