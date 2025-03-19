import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { MarketplaceProvider } from './MarketplaceProvider';
import { useMarketplace } from '../../hooks/useMarketplace';
import { USE_MARKETPLACE_MOCK_RETURN_VALUE } from '../../hooks/useMarketplace/testing/mocks';
import { useSQLQuery } from '@/app/api';

jest.mock('@/app/api');
jest.mock('@/app/api/marketplace/carts', () => ({
  sqlGetMarketplaceCart: jest.fn()
}));
jest.mock('@/hooks/useRouteParams', () => ({
  useRouteParams: () => ({ missionPartnerId: 'mp-1' })
}));

// A test component to consume the context value
const TestComponent = () => {
  const {
    marketplaceCartItems,
    marketplaceOpenSideDrawerTitle,
    onSideDrawerOpen,
    onSideDrawerClose
  } = useMarketplace();
  return (
    <div>
      <p>Open side drawer title: {marketplaceOpenSideDrawerTitle}</p>
      <p>
        Current cart items:{' '}
        {marketplaceCartItems.data.marketplaceOrderItems[0].id}
      </p>

      <button onClick={() => onSideDrawerOpen('edit cart')}>edit cart</button>
      <button onClick={() => onSideDrawerClose('edit cart')}>
        close edit cart
      </button>
    </div>
  );
};

describe('MarketplaceProvider', () => {
  beforeAll(() => {
    (useSQLQuery as jest.Mock).mockReturnValue(
      USE_MARKETPLACE_MOCK_RETURN_VALUE.marketplaceCartItems
    );
  });

  it('returns the marketplace cart items', () => {
    render(
      <MarketplaceProvider>
        <TestComponent />
      </MarketplaceProvider>
    );

    expect(
      screen.getByText('Current cart items: mock-marketplace-order-item')
    ).toBeInTheDocument();
  });

  it('updates the marketplace cart items', () => {
    const { rerender } = render(
      <MarketplaceProvider>
        <TestComponent />
      </MarketplaceProvider>
    );

    expect(
      screen.getByText('Current cart items: mock-marketplace-order-item')
    ).toBeInTheDocument();

    (useSQLQuery as jest.Mock).mockReturnValueOnce({
      ...USE_MARKETPLACE_MOCK_RETURN_VALUE,
      data: {
        marketplaceOrderItems: [
          {
            id: 'LOCALIZED-MOCK-ORDER-ITEM'
          }
        ]
      }
    });

    rerender(
      <MarketplaceProvider>
        <TestComponent />
      </MarketplaceProvider>
    );

    expect(
      screen.getByText('Current cart items: LOCALIZED-MOCK-ORDER-ITEM')
    ).toBeInTheDocument();
  });

  it('Updates the side drawer title when onSideDrawerOpen is called', () => {
    const { rerender } = render(
      <MarketplaceProvider>
        <TestComponent />
      </MarketplaceProvider>
    );

    expect(screen.getByText('Open side drawer title:')).toBeInTheDocument();

    fireEvent.click(screen.getByText('edit cart'));

    rerender(
      <MarketplaceProvider>
        <TestComponent />
      </MarketplaceProvider>
    );

    expect(
      screen.getByText('Open side drawer title: edit cart')
    ).toBeInTheDocument();
  });

  it('Updates the open side drawer title when a drawer is closed', () => {
    const { rerender } = render(
      <MarketplaceProvider>
        <TestComponent />
      </MarketplaceProvider>
    );

    expect(screen.getByText('Open side drawer title:')).toBeInTheDocument();

    fireEvent.click(screen.getByText('edit cart'));

    rerender(
      <MarketplaceProvider>
        <TestComponent />
      </MarketplaceProvider>
    );

    expect(
      screen.getByText('Open side drawer title: edit cart')
    ).toBeInTheDocument();
  });
});
