import { screen, render, fireEvent, waitFor } from '@@/test-utils';
import type { CartItemData } from '../../MarketplaceCart.types';
import { EditCartItemModal } from './EditCartItemModal';
import { ConfirmationModal } from './components/ConfirmationModal';
import { useSQLMutation } from '@/app/api';

jest.mock('next-auth/react', () => ({
  useSession: jest.fn(() => ({
    data: {
      user: { name: 'Test User', role: 'admin' },
      expires: '9999-12-31T23:59:59.999Z'
    }
  }))
}));

jest.mock('@/hooks/useRouteParams', () => ({
  useRouteParams: () => ({ missionPartnerId: 'mp-1' })
}));

jest.mock('@/app/api/marketplace/carts', () => ({
  sqlRemoveItemFromCart: jest.fn()
}));

jest.mock('@/app/api/marketplace/order-items', () => ({
  sqlUpdateMarketplaceOrderItem: jest.fn()
}));

jest.mock('@/app/api', () => ({
  useSQLMutation: jest
    .fn()
    .mockReturnValue({ loading: false, error: false, mutation: jest.fn })
}));

jest.mock('@/app/marketplace/components/ProductCustomizationModal', () => ({
  ProductCustomizationModal: () => <div>ProductCustomizationModal</div>
}));

jest.mock('./components/ConfirmationModal', () => ({
  ConfirmationModal: jest.fn(() => <div>ConfirmationModal</div>)
}));

jest.useFakeTimers();

describe('EditCartItemModal', () => {
  const defaultProps = () => ({
    displayEditItemModal: true,
    cartItem: {} as CartItemData,
    onClose: jest.fn(),
    onRemoveCartItem: jest.fn(),
    showConfirmationModal: false
  });

  it('renders a ProductCustomizationModal', () => {
    render(<EditCartItemModal {...defaultProps()} />);

    expect(screen.getByText('ProductCustomizationModal')).toBeInTheDocument();
    expect(screen.queryByText('ConfirmationModal')).not.toBeInTheDocument();
  });

  it('renders a confirmation modal', () => {
    const props = { ...defaultProps(), showConfirmationModal: true };
    render(<EditCartItemModal {...props} />);

    expect(
      screen.queryByText('ProductCustomizationModal')
    ).not.toBeInTheDocument();
    expect(screen.getByText('ConfirmationModal')).toBeInTheDocument();
  });

  it('removes the item from cart on confirmation', async () => {
    const props = { ...defaultProps(), showConfirmationModal: true };

    const removeItemFromCartSpy = jest.fn();

    (useSQLMutation as jest.Mock).mockReturnValue({
      loading: true,
      error: false,
      mutation: removeItemFromCartSpy
    });

    (ConfirmationModal as jest.Mock).mockImplementation(({ onConfirm }) => (
      <button onClick={onConfirm}>MockConfirmationModal</button>
    ));

    render(<EditCartItemModal {...props} />);

    fireEvent.click(screen.getByText('MockConfirmationModal'));
    jest.runAllTimers();

    waitFor(() => {
      expect(removeItemFromCartSpy).toHaveBeenCalledTimes(1);
      expect(props.onClose).toHaveBeenCalled();
    });
  });
});
