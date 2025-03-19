import { renderV3, screen, fireEvent } from '@@/test-utils';
import { Footer } from './Footer';

const mockGetPageNumbers = jest.fn().mockReturnValue([0, 1, 2]);

const mockTable = {
  previousPage: jest.fn(),
  nextPage: jest.fn(),
  getCanPreviousPage: jest.fn().mockReturnValue(true),
  getCanNextPage: jest.fn().mockReturnValue(true),
  setPageIndex: jest.fn(),
  getState: jest
    .fn()
    .mockReturnValue({ pagination: { pageIndex: 0, pageSize: 2 } }),
  handlePageChange: jest.fn(),
  getPageNumbers: mockGetPageNumbers
};

const mockData = [
  { firstName: 'Bob', lastName: 'Belcher', email: 'bbelcher@email.com' },
  { firstName: 'Calvin', lastName: 'Fischoder', email: 'cfischoder@email.com' },
  { firstName: 'Tina', lastName: 'Belcher', email: 'tbelcher@email.com' }
];

describe('Footer', () => {
  const defaultProps = {
    table: mockTable,
    tableData: mockData,
    totalItems: 3,
    searchTerm: ''
  };

  it('renders the footer with correct text', () => {
    renderV3(<Footer {...defaultProps} />);
    expect(screen.getByText('1 - 2 of 3 items')).toBeInTheDocument();
  });

  it('calls previousPage when previous button is clicked', () => {
    renderV3(<Footer {...defaultProps} />);
    const prevButton = screen.getByLabelText('Previous Page');
    fireEvent.click(prevButton);
    expect(mockTable.previousPage).toHaveBeenCalled();
  });

  it('calls nextPage when next button is clicked', () => {
    renderV3(<Footer {...defaultProps} />);
    const nextButton = screen.getByLabelText('Next Page');
    fireEvent.click(nextButton);
    expect(mockTable.nextPage).toHaveBeenCalled();
  });

  it('renders the correct number of page buttons', () => {
    renderV3(<Footer {...defaultProps} />);
    const pageButtons = screen.getAllByRole('button', { name: /[0-9]/ });
    expect(pageButtons).toHaveLength(2);
  });

  it('does not render page buttons when there are no pages', () => {
    mockGetPageNumbers.mockReturnValue([]);
    renderV3(<Footer {...defaultProps} tableData={[]} totalItems={0} />);
    const pageButtons = screen.queryAllByRole('button', { name: /[0-9]/ });
    expect(pageButtons).toHaveLength(0);
  });

  it('cannot navigate outside of page range', () => {
    mockTable.getCanPreviousPage.mockReturnValue(false);
    mockTable.getCanNextPage.mockReturnValue(false);
    renderV3(<Footer {...defaultProps} />);
    const prevButton = screen.getByLabelText('Previous Page');
    const nextButton = screen.getByLabelText('Next Page');
    expect(prevButton).toBeDisabled();
    expect(nextButton).toBeDisabled();
  });
});
