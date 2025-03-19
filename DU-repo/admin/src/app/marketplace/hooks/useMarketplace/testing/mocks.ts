import type { UseMarketplaceProps } from '../useMarketplace';
import type { UseGetUser } from '@/api/user/useGetUser';

/** Util to simplify useMarketplace mocking across marketplace pages */
export const USE_MARKETPLACE_MOCK_RETURN_VALUE: UseMarketplaceProps = {
  marketplaceCartItems: {
    data: {
      marketplaceOrderItems: [
        {
          id: 'mock-marketplace-order-item'
        }
      ]
    },
    loading: false,
    error: '',
    query: () => ({})
  },
  marketplaceUser: {
    userLoading: false,
    error: '',
    user: {
      firstName: 'John',
      lastName: 'Doe'
    }
  } as unknown as UseGetUser,
  onSideDrawerClose: () => {
    return;
  },
  onSideDrawerOpen: () => {
    return;
  },
  marketplaceOpenSideDrawerTitle: null
};
