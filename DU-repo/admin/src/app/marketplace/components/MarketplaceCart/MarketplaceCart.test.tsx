import { screen, render, fireEvent, waitFor } from '@@/test-utils';
import { MarketplaceCart } from './MarketplaceCart';
import { useRouteParams } from '@/hooks/useRouteParams';
import { USE_MARKETPLACE_MOCK_RETURN_VALUE } from '@/app/marketplace/hooks/useMarketplace/testing/mocks';
import { useMarketplace } from '@/app/marketplace/hooks/useMarketplace';
import { useSQLMutation } from '@/app/api';

jest.mock('./components/CartItem');
jest.mock('@/hooks/useRouteParams');
jest.mock('@/app/api/marketplace/carts', () => ({
  sqlSubmitCart: jest.fn()
}));
jest.mock('@/app/api', () => ({
  useSQLMutation: jest
    .fn()
    .mockReturnValue({ loading: false, error: false, mutation: jest.fn })
}));

jest.mock('@/app/marketplace/hooks/useMarketplace');
jest.mock('./components/EditCartItemModal', () => ({
  EditCartItemModal: jest.fn(() => <div></div>)
}));

jest.mock('next-auth/react', () => ({
  useSession: jest.fn(() => ({
    data: {
      user: { name: 'Test User', role: 'admin' },
      expires: '9999-12-31T23:59:59.999Z'
    }
  }))
}));
describe('MarketplaceCart', () => {
  beforeAll(() => {
    (useRouteParams as jest.Mock).mockReturnValue({
      missionPartnerId: 'partner-1'
    });

    (useMarketplace as jest.Mock).mockReturnValue(
      USE_MARKETPLACE_MOCK_RETURN_VALUE
    );
  });

  const defaultProps = () => ({
    onClose: jest.fn(),
    onCartSubmission: jest.fn()
  });

  it('renders with cart items', () => {
    render(<MarketplaceCart {...defaultProps()} />);

    expect(
      screen.getByText('Submit Customization Request')
    ).toBeInTheDocument();
  });

  it('renders an empty view', () => {
    (useMarketplace as jest.Mock).mockReturnValueOnce({
      ...USE_MARKETPLACE_MOCK_RETURN_VALUE,
      marketplaceCartItems: {
        ...USE_MARKETPLACE_MOCK_RETURN_VALUE.marketplaceCartItems,
        data: {
          marketplaceOrderItems: []
        }
      }
    });

    render(<MarketplaceCart {...defaultProps()} />);

    expect(screen.getByText('Cart is empty.')).toBeInTheDocument();
  });

  it('handles edit modal close', async () => {
    const props = defaultProps();
    const mockReferenceId = 'ff1122';
    const submitCartSpy = jest.fn().mockResolvedValue({
      data: { referenceId: mockReferenceId }
    });

    (useSQLMutation as jest.Mock).mockReturnValue({
      loading: false,
      error: false,
      mutation: submitCartSpy
    });

    render(<MarketplaceCart {...props} />);

    fireEvent.click(screen.getByText('Submit Customization Request'));

    await waitFor(() => expect(submitCartSpy).toHaveBeenCalled());
    expect(props.onCartSubmission).toHaveBeenCalledWith(mockReferenceId);
    expect(props.onClose).toHaveBeenCalled();
  });

  it('does not submit the cart if a submission is already in progress', async () => {
    const props = defaultProps();
    const submitCartSpy = jest.fn().mockResolvedValue({});

    (useSQLMutation as jest.Mock).mockReturnValue({
      loading: true,
      error: false,
      mutation: submitCartSpy
    });

    render(<MarketplaceCart {...props} />);

    fireEvent.click(screen.getByText('Submit Customization Request'));

    await waitFor(() => expect(submitCartSpy).not.toHaveBeenCalled());
    expect(props.onCartSubmission).not.toHaveBeenCalled();
    expect(props.onClose).not.toHaveBeenCalled();
  });
});
