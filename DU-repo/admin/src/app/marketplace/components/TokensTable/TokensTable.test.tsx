import React from 'react';
import { renderV3, screen } from '@@/test-utils';
import { TokensTable } from './TokensTable';
import { useSQLQuery } from '@/app/api';

jest.mock('../Table/Table', () => ({
  Table: () => <div role="table"></div>
}));

jest.mock('@/app/api', () => ({
  useSQLQuery: jest.fn()
}));

const query = jest.fn();

describe('TokensTable', () => {
  beforeAll(() => {
    (useSQLQuery as jest.Mock).mockReturnValue({
      loading: false,
      error: false,
      data: {
        marketplaceOrders: { results: [], total: 0, cursor: null }
      },
      query: query
    });
  });

  it('renders the TokensTable', () => {
    renderV3(<TokensTable missionPartnerId="123" filter={null} />);

    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();
    expect(screen.getByRole('table')).toBeInTheDocument();
  });
});
