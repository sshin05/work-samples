import React from 'react';
import { renderV3, screen, waitFor, userEvent } from '@@/test-utils';
import { Table } from './Table';

const mockSetOptions = jest.fn();

const mockLoadMore = jest.fn();

const MOCK_DATA = [
  {
    accessor1: 'value1',
    accessor2: 'value2'
  },
  {
    accessor1: 'value3',
    accessor2: 'value4'
  }
];

const MOCK_COLUMNS = [
  {
    header: 'Header 1',
    accessor: 'accessor1',
    sortable: true
  },
  {
    header: 'Header 2',
    accessor: 'accessor2'
  }
];

describe('Table', () => {
  describe('Basic Render', () => {
    it('renders the Table', () => {
      renderV3(
        <Table
          caption=""
          setOptions={mockSetOptions}
          columns={MOCK_COLUMNS}
          data={MOCK_DATA}
          total={MOCK_DATA.length}
          nextCursor="cursor"
          loadMore={mockLoadMore}
          limit={10}
          loading={false}
        />
      );

      const table = screen.getByRole('table');
      expect(table).toBeInTheDocument();
    });

    it('renders the Table Loading', () => {
      renderV3(
        <Table
          caption=""
          setOptions={mockSetOptions}
          columns={MOCK_COLUMNS}
          data={MOCK_DATA}
          total={MOCK_DATA.length}
          nextCursor="cursor"
          loadMore={mockLoadMore}
          limit={10}
          loading={true}
        />
      );

      const table = screen.getByRole('table');
      expect(table).toBeInTheDocument();
    });

    it('renders the Table with no total', () => {
      renderV3(
        <Table
          caption=""
          setOptions={mockSetOptions}
          columns={MOCK_COLUMNS}
          data={MOCK_DATA}
          nextCursor="cursor"
          loadMore={mockLoadMore}
          limit={10}
          loading={false}
        />
      );

      const table = screen.getByText('Showing 2 Items');
      expect(table).toBeInTheDocument();
    });

    it('renders the Table with correct number of rows', () => {
      renderV3(
        <Table
          caption=""
          setOptions={mockSetOptions}
          columns={MOCK_COLUMNS}
          data={MOCK_DATA}
          total={MOCK_DATA.length}
          nextCursor="cursor"
          loadMore={mockLoadMore}
          limit={10}
          loading={false}
        />
      );

      const rows = screen.getAllByRole('row');
      expect(rows).toHaveLength(MOCK_DATA.length + 1); // +1 for the header row
    });

    it('renders the Table with correct number of columns', () => {
      renderV3(
        <Table
          caption=""
          setOptions={mockSetOptions}
          columns={MOCK_COLUMNS}
          data={MOCK_DATA}
          total={MOCK_DATA.length}
          nextCursor="cursor"
          loadMore={mockLoadMore}
          limit={10}
          loading={false}
        />
      );

      const headerRow = screen.getByRole('row', { name: 'Header 1 Header 2' });
      expect(headerRow).toBeInTheDocument();
    });

    it('should call loadMore when the load more button is clicked', () => {
      renderV3(
        <Table
          caption=""
          setOptions={mockSetOptions}
          columns={MOCK_COLUMNS}
          data={MOCK_DATA}
          total={MOCK_DATA.length}
          nextCursor="cursor"
          loadMore={mockLoadMore}
          limit={10}
          loading={false}
        />
      );

      const loadMoreButton = screen.getByRole('button', { name: 'Load More' });
      loadMoreButton.click();
      expect(mockLoadMore).toHaveBeenCalled();
    });

    it('should call setOptions with the correct parameters when the sort button is clicked', async () => {
      renderV3(
        <Table
          caption=""
          setOptions={mockSetOptions}
          columns={MOCK_COLUMNS}
          data={MOCK_DATA}
          total={MOCK_DATA.length}
          nextCursor="cursor"
          loadMore={mockLoadMore}
          limit={10}
          loading={false}
        />
      );

      await waitFor(() => {
        const sortButton = screen.getByRole('button', { name: 'Header 1' });
        sortButton.click();
      });

      expect(mockSetOptions).toHaveBeenCalledWith(
        null,
        10,
        'accessor1',
        'asc',
        null,
        null
      );
    });

    it('should call setOptions with the correct parameters when the searching', async () => {
      renderV3(
        <Table
          caption=""
          setOptions={mockSetOptions}
          columns={MOCK_COLUMNS}
          data={MOCK_DATA}
          total={MOCK_DATA.length}
          nextCursor="cursor"
          loadMore={mockLoadMore}
          limit={10}
          loading={false}
          searchOptions={{ placeholder: 'Search' }}
        />
      );

      await waitFor(() => {
        const searchInput = screen.getByPlaceholderText('Search');
        userEvent.type(searchInput, 'test');
      });

      expect(mockSetOptions).toHaveBeenCalledWith(
        null,
        10,
        null,
        'asc',
        null,
        'test'
      );
    });

    it('should call setOptions when filtering', async () => {
      renderV3(
        <Table
          caption=""
          setOptions={mockSetOptions}
          columns={MOCK_COLUMNS}
          filterOptions={[
            {
              label: 'Status',
              key: 'status',
              options: [
                { label: 'Processing', value: 'PROCESSING' },
                { label: 'Ready for Payment', value: 'READY_FOR_PAYMENT' },
                { label: 'In Contracting', value: 'IN_CONTRACTING' },
                { label: 'Paid', value: 'PAID' },
                { label: 'Cancelled', value: 'CANCELLED' },
                { label: 'Refunded', value: 'REFUNDED' }
              ]
            }
          ]}
          data={MOCK_DATA}
          total={MOCK_DATA.length}
          nextCursor="cursor"
          loadMore={mockLoadMore}
          limit={10}
          loading={false}
          searchOptions={{ placeholder: 'Search' }}
        />
      );

      await waitFor(() => {
        const showFiltersButton = screen.getByRole('button', {
          name: 'Show Filters'
        });
        showFiltersButton.click();
      });

      await waitFor(() => {
        const submitButton = screen.getByRole('button', { name: 'Apply' });
        submitButton.click();
      });

      expect(mockSetOptions).toHaveBeenCalledWith(
        null,
        10,
        null,
        'asc',
        null,
        'test'
      );

      await waitFor(() => {
        const resetButton = screen.getByRole('button', { name: 'Reset' });
        resetButton.click();
      });
    });

    it('should show page buttons', async () => {
      const setPage = jest.fn();
      renderV3(
        <Table
          caption=""
          setOptions={mockSetOptions}
          columns={MOCK_COLUMNS}
          data={MOCK_DATA}
          total={MOCK_DATA.length}
          nextCursor="cursor"
          page={1}
          setPage={setPage}
          limit={1}
          loading={false}
          searchOptions={{ placeholder: 'Search' }}
        />
      );

      const nextPageButton = screen.getAllByRole('button')[4];
      nextPageButton.click();
      expect(setPage).toHaveBeenCalled();
    });

    it('should show page buttons with more than 3 pages on page 1', async () => {
      const setPage = jest.fn();
      const page = 1;

      renderV3(
        <Table
          caption=""
          setOptions={mockSetOptions}
          columns={MOCK_COLUMNS}
          data={MOCK_DATA}
          total={8}
          nextCursor="cursor"
          page={page}
          setPage={setPage}
          limit={2}
          loading={false}
          searchOptions={{ placeholder: 'Search' }}
        />
      );
      const tablePage1 = screen.getByRole('table');
      expect(tablePage1).toBeInTheDocument();
    });

    it('should show page buttons with more than 3 pages on page 2', async () => {
      const setPage = jest.fn();
      const page = 2;

      renderV3(
        <Table
          caption=""
          setOptions={mockSetOptions}
          columns={MOCK_COLUMNS}
          data={MOCK_DATA}
          total={8}
          nextCursor="cursor"
          page={page}
          setPage={setPage}
          limit={2}
          loading={false}
          searchOptions={{ placeholder: 'Search' }}
        />
      );
      const tablePage1 = screen.getByRole('table');
      expect(tablePage1).toBeInTheDocument();
    });

    it('should show page buttons with more than 3 pages on page 3', async () => {
      const setPage = jest.fn();
      const page = 3;

      renderV3(
        <Table
          caption=""
          setOptions={mockSetOptions}
          columns={MOCK_COLUMNS}
          data={MOCK_DATA}
          total={8}
          nextCursor="cursor"
          page={page}
          setPage={setPage}
          limit={2}
          loading={false}
          searchOptions={{ placeholder: 'Search' }}
        />
      );
      const tablePage1 = screen.getByRole('table');
      expect(tablePage1).toBeInTheDocument();
    });

    it('should show page buttons with more than 3 pages on last page', async () => {
      const setPage = jest.fn();
      const page = 4;

      renderV3(
        <Table
          caption=""
          setOptions={mockSetOptions}
          columns={MOCK_COLUMNS}
          data={MOCK_DATA}
          total={8}
          nextCursor="cursor"
          page={page}
          setPage={setPage}
          limit={2}
          loading={false}
          searchOptions={{ placeholder: 'Search' }}
        />
      );
      const tablePage1 = screen.getByRole('table');
      expect(tablePage1).toBeInTheDocument();
    });

    it('should call setOptions when sorting', async () => {
      renderV3(
        <Table
          caption=""
          setOptions={mockSetOptions}
          columns={MOCK_COLUMNS}
          data={MOCK_DATA}
          total={MOCK_DATA.length}
          nextCursor="cursor"
          loadMore={mockLoadMore}
          limit={10}
          loading={false}
          searchOptions={{ placeholder: 'Search' }}
        />
      );

      await waitFor(() => {
        const sortButton = screen.getByRole('button', {
          name: 'Header 1'
        });
        sortButton.click();
      });

      expect(mockSetOptions).toHaveBeenCalledWith(
        null,
        10,
        null,
        'asc',
        null,
        'test'
      );

      await waitFor(() => {
        const sortButton = screen.getByRole('button', {
          name: 'Header 1'
        });
        sortButton.click();
      });

      await waitFor(() => {
        const sortButton = screen.getByRole('button', {
          name: 'Header 2'
        });
        sortButton.click();
      });

      expect(mockSetOptions).toHaveBeenCalledWith(
        null,
        10,
        null,
        'asc',
        null,
        'test'
      );
    });
  });
});
