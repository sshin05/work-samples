import { renderV3 } from '@@/test-utils';
import { TableRow } from './TableRow';
import { mockData, mockColumns } from '../../../../table-utils/mocks';

const noopObject = () => ({}); // for sonarqube warnings/errors

const createColumnObject = (row, column) => ({
  id: `${row.id}-${column.id}`,
  getContext: jest.fn(noopObject),
  column: {
    columnDef: {
      cell: jest.fn(() => row[column.id])
    }
  }
});

const createRowObject = (row, rowIndex) => ({
  id: `row${rowIndex}`,
  getVisibleCells: jest.fn(() =>
    mockColumns.map(column => createColumnObject(row, column))
  )
});

const mockTable = {
  getRowModel: jest.fn(() => ({
    rows: mockData.map((row, rowIndex) => createRowObject(row, rowIndex))
  }))
};

describe('TableCell', () => {
  it('renders table cells correctly', () => {
    const { getByText } = renderV3(<TableRow table={mockTable} />);

    mockData.forEach(row => {
      mockColumns.forEach(column => {
        expect(getByText(row[column.id])).toBeInTheDocument();
      });
    });
  });
});
