import React from 'react';
import { renderV3, screen, userEvent, waitFor } from '@@/test-utils';
import { OrderItemsTable } from './OrderItemsTable';
import { useSQLMutation, useSQLQuery } from '@/app/api';
import { useSession } from 'next-auth/react';
import {
  getUserRoles,
  useIsDuAdmin
} from '@/hooks/useCurrentSession/useCurrentSession';
import {
  sqlFindMarketplaceOrderItems,
  sqlGetMarketplaceOrderItem
} from '@/app/api/marketplace/order-items';

jest.mock('@/app/api/marketplace/order-items', () => ({
  sqlFindMarketplaceOrderItems: jest.fn()
}));
jest.mock('@/app/api/marketplace/vendors', () => ({
  sqlFindMarketplaceVendors: jest.fn()
}));
jest.mock('@/app/api', () => ({
  useSQLQuery: jest.fn(),
  useSQLMutation: jest.fn()
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
  useIsDuAdmin: jest.fn(),
  getUserRoles: jest.fn()
}));

const query = jest.fn();

describe('OrderItemsTable', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useSQLQuery as jest.Mock).mockImplementation(query => {
      if (query === sqlFindMarketplaceOrderItems) {
        return {
          loading: false,
          error: false,
          data: {
            marketplaceOrderItems: { records: [], total: 0 },
            marketplaceVendors: { records: [], total: 0 }
          },
          query
        };
      }
      if (query === sqlGetMarketplaceOrderItem) {
        return {
          loading: false,
          error: false,
          data: {
            id: 'test-order-item',
            marketplaceNotes: []
          },
          query
        };
      }
      return { loading: false, error: false, data: null, query };
    });

    (useSQLMutation as jest.Mock).mockReturnValue({
      mutation: jest.fn()
    });
  });

  it('should have Mission Partner column when user is a DU Admin', () => {
    (useSession as jest.Mock).mockReturnValue({
      data: {
        user: { name: 'Admin User', role: 'admin' },
        expires: '9999-12-31T23:59:59.999Z'
      }
    });

    (useIsDuAdmin as jest.Mock).mockReturnValue({
      isDuAdmin: true
    });

    (getUserRoles as jest.Mock).mockReturnValue({
      isDuAdmin: true
    });

    renderV3(<OrderItemsTable missionPartnerId="123" />);

    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();
    expect(screen.getByText('Order Item')).toBeInTheDocument();
    expect(screen.getByText('Date Submitted')).toBeInTheDocument();
    expect(screen.getByText('Mission Partner')).toBeInTheDocument();
    expect(screen.getByText('Vendor')).toBeInTheDocument();
    expect(screen.getByText('Price')).toBeInTheDocument();
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

    renderV3(<OrderItemsTable missionPartnerId="123" />);

    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();
    expect(screen.getByText('Order Item')).toBeInTheDocument();
    expect(screen.getByText('Date Submitted')).toBeInTheDocument();
    expect(screen.queryByText('Mission Partner')).not.toBeInTheDocument();
    expect(screen.getByText('Vendor')).toBeInTheDocument();
    expect(screen.getByText('Price')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
  });

  it.skip('should set options when sorting changes', async () => {
    renderV3(<OrderItemsTable missionPartnerId="123" />);

    const sortingButton = screen.getByText('Order Item');
    userEvent.click(sortingButton);

    await waitFor(() => {
      expect(query).toHaveBeenCalled();
    });
  });
});
