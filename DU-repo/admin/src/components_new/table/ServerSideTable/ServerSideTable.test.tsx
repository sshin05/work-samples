import { renderV3, screen } from '@@/test-utils';
import { ServerSideTable } from './ServerSideTable';
import { mockColumns, mockData } from '../table-utils/mocks';

const mockProps = {
  columns: mockColumns,
  data: mockData,
  hasToolbar: true,
  toolbarType: 'search',
  searchPlaceholder: 'search here',
  total: mockData.length,
  size: 2,
  page: 1,
  setPage: jest.fn(),
  setSorting: jest.fn(),
  setSearchTerm: jest.fn(),
  searchTerm: ''
};

describe('ServerSideTable', () => {
  it('renders with toolbar & searchPlaceholder', () => {
    renderV3(<ServerSideTable {...mockProps} />);
    expect(screen.getByLabelText('search table for value')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('search here')).toBeInTheDocument();
  });

  it('renders footer', () => {
    renderV3(<ServerSideTable {...mockProps} />);
    expect(screen.getByText('1 - 2 of 2 items')).toBeInTheDocument();
  });
});
