import { renderV3, screen } from '@@/test-utils';
import { Table } from './Table';
import { mockData, mockColumns } from '../../table-utils/mocks';
import type { Table as TableType } from '@tanstack/react-table';

const noopObject = () => ({}); // for sonarqube warnings/errors

const createColumnObject = (row, column) => ({
  columnDef: {
    cell: jest.fn(() => row[column.id])
  }
});

const mockTable: Partial<TableType<unknown>> = {
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
  ]),

  getRowModel: jest.fn(() => ({
    rows: mockData.map((row, rowIndex) => ({
      id: `row${rowIndex}`,
      getVisibleCells: jest.fn(() =>
        mockColumns.map(column => ({
          id: `${rowIndex}-${column.id}`,
          getContext: jest.fn(noopObject),
          column: createColumnObject(row, column)
        }))
      )
    }))
  }))
} as unknown as TableType<unknown>;

describe('Table', () => {
  const defaultProps = {
    table: mockTable as TableType<unknown>,
    data: mockData,
    columns: mockColumns,
    loading: false,
    skeletonRows: 5,
    tableHeight: 600
  };

  it('renders the table with correct number of rows', () => {
    renderV3(<Table {...defaultProps} />);
    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(4);
  });

  it('renders the table with correct number of columns', () => {
    renderV3(<Table {...defaultProps} />);
    const columns = screen.getAllByRole('columnheader');
    expect(columns).toHaveLength(3);
  });

  it('renders the table with correct number of cells', () => {
    renderV3(<Table {...defaultProps} />);
    const cells = screen.getAllByRole('cell');
    expect(cells).toHaveLength(7);
  });

  it('renders the table with no data message', () => {
    renderV3(<Table {...defaultProps} data={[]} />);
    expect(screen.getByText('No Results Found')).toBeInTheDocument();
  });
});
