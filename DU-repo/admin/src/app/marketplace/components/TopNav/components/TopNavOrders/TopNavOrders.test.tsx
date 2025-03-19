import { useRouteParams } from '@/hooks/useRouteParams';
import { TopNavOrders } from './TopNavOrders';
import { renderV3, screen } from '@@/test-utils';

jest.mock('@/hooks/useRouteParams');

const mockMpId = 'test-partner';
describe('TopNavOrders Component', () => {
  beforeEach(() => {
    (useRouteParams as jest.Mock).mockReturnValue({
      missionPartnerId: mockMpId
    });
  });

  describe('Basic Render', () => {
    it('renders the Orders link', () => {
      renderV3(<TopNavOrders />);

      const ordersLink = screen.getByRole('link', { name: 'Orders' });
      expect(ordersLink).toBeInTheDocument();
      expect(ordersLink).toHaveAttribute(
        'href',
        expect.stringContaining(`/marketplace/mp/${mockMpId}/orders`)
      );
    });
  });

  describe('Notification Indicator', () => {
    /// @TODO(Lyle): Update this test to be dynamic when we know how to compute
    // `hasOrdersReadyForPayment`.
    it('renders notification indicator when orders are ready for payment', () => {
      renderV3(<TopNavOrders />);

      const notificationIndicator = screen.getByRole('presentation');
      expect(notificationIndicator).toBeInTheDocument();
    });
  });
});
