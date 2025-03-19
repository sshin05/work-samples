import React from 'react';
import { renderV3, screen, userEvent, waitFor } from '@@/test-utils';
import { OrdersTable } from './OrdersTable';
import { useSQLQuery } from '@/app/api';
import { useSession } from 'next-auth/react';
import { getUserRoles } from '@/hooks/useCurrentSession/useCurrentSession';

jest.mock('@/app/api/marketplace/orders', () => ({
  sqlFindMarketplaceOrders: jest.fn()
}));
jest.mock('@/app/api', () => ({
  useSQLQuery: jest.fn()
}));
jest.mock('next/navigation', () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn()
  })
}));
jest.mock('next-auth/react', () => ({
  useSession: jest.fn()
}));
jest.mock('@/hooks/useCurrentSession/useCurrentSession', () => ({
  getUserRoles: jest.fn()
}));

const query = jest.fn();

describe('OrdersTable', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useSQLQuery as jest.Mock).mockReturnValue({
      loading: false,
      error: false,
      data: {
        marketplaceOrders: { results: [], total: 0, cursor: null }
      },
      query: query
    });
  });

  it('should have Mission Partner column when user is a DU Admin', () => {
    (useSession as jest.Mock).mockReturnValue({
      data: {
        user: { name: 'Admin User', role: 'admin' },
        expires: '9999-12-31T23:59:59.999Z'
      }
    });

    (getUserRoles as jest.Mock).mockReturnValue({
      isDuAdmin: true
    });

    renderV3(<OrdersTable missionPartnerId="123" />);

    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();
    expect(screen.getByText('Order Id')).toBeInTheDocument();
    expect(screen.getByText('Quantity')).toBeInTheDocument();
    expect(screen.getByText('Order Date')).toBeInTheDocument();
    expect(screen.getByText('Mission Partner')).toBeInTheDocument();
    expect(screen.getByText('Order Total')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
  });

  it('should not have Mission Partner column when user is not a DU Admin', () => {
    (useSession as jest.Mock).mockReturnValue({
      data: {
        user: { name: 'Regular User', role: 'user' },
        expires: '9999-12-31T23:59:59.999Z'
      }
    });

    (getUserRoles as jest.Mock).mockReturnValue({
      isDuAdmin: false
    });

    renderV3(<OrdersTable missionPartnerId="123" />);

    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();
    expect(screen.getByText('Order Id')).toBeInTheDocument();
    expect(screen.getByText('Quantity')).toBeInTheDocument();
    expect(screen.getByText('Order Date')).toBeInTheDocument();
    expect(screen.queryByText('Mission Partner')).not.toBeInTheDocument();
    expect(screen.getByText('Order Total')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
  });

  it.skip('should set options', async () => {
    renderV3(<OrdersTable missionPartnerId="123" />);

    const setOptionsButton = screen.getByText('Set Options');
    userEvent.click(setOptionsButton);

    await waitFor(() => {
      expect(query).toHaveBeenCalledWith({
        filter: {
          missionPartnerId: '123'
        },
        limit: 20,
        page: 0
      });
    });
  });
});
