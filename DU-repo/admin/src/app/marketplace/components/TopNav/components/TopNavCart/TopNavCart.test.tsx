import { fireEvent, render, screen } from '@@/test-utils';
import { TopNavCart } from './TopNavCart';
import { USE_MARKETPLACE_MOCK_RETURN_VALUE } from '@/app/marketplace/hooks/useMarketplace/testing/mocks';
import { useMarketplace } from '@/app/marketplace/hooks/useMarketplace';

jest.mock('@cerberus/icons', () => ({
  ShoppingCart: () => <div data-testid="shopping-cart-icon" />
}));

jest.mock('@/app/marketplace/components/MarketplaceCart', () => ({
  MarketplaceCart: () => <div></div>
}));

jest.mock('./components/CartSubmissionConfirmationModal', () => ({
  CartSubmissionConfirmationModal: () => (
    <div>MockCartSubmissionConfirmationModal</div>
  )
}));

jest.mock('@/app/marketplace/components/SideDrawer', () => ({
  SideDrawer: ({
    isOpen,
    children
  }: {
    isOpen: boolean;
    children: React.ReactNode;
  }) => (isOpen ? <div>MockSideDrawer{children}</div> : null),
  SideDrawerBody: () => <div>MockSideDrawerBody</div>
}));

jest.mock('@/app/marketplace/hooks/useMarketplace');
jest.mock('@/app/api/marketplace/carts', () => ({
  sqlGetMarketplaceCart: jest.fn()
}));

describe('TopNavCart Component', () => {
  beforeAll(() => {
    (useMarketplace as jest.Mock).mockReturnValue(
      USE_MARKETPLACE_MOCK_RETURN_VALUE
    );
  });
  describe('Basic Render', () => {
    it('renders the ShoppingCart icon and displays item count badge', () => {
      render(<TopNavCart />);

      expect(screen.getByTestId('shopping-cart-icon')).toBeInTheDocument();
      expect(screen.getByText('1')).toBeInTheDocument();
    });

    it('renders the ShoppingCart icon without an item count', () => {
      (useMarketplace as jest.Mock).mockReturnValueOnce({
        ...USE_MARKETPLACE_MOCK_RETURN_VALUE,
        marketplaceCartItems: {
          ...USE_MARKETPLACE_MOCK_RETURN_VALUE.marketplaceCartItems,
          data: {
            marketplaceOrderItems: []
          }
        }
      });

      render(<TopNavCart />);

      expect(screen.getByTestId('shopping-cart-icon')).toBeInTheDocument();
      expect(screen.queryByText('1')).not.toBeInTheDocument();
    });

    it('includes a cart submission confirmation modal', () => {
      render(<TopNavCart />);

      expect(
        screen.getByText('MockCartSubmissionConfirmationModal')
      ).toBeInTheDocument();
    });
  });

  it('opens the side drawer when clicked', () => {
    render(<TopNavCart />);

    expect(screen.queryByText('MockSideDrawer')).not.toBeInTheDocument();

    fireEvent.click(screen.getByTestId('shopping-cart-icon'));

    expect(screen.getByText('MockSideDrawer')).toBeInTheDocument();
  });
});
