import { screen, render } from '@@/test-utils';
import { CartItem } from './CartItem';
import type { sqlGetMarketplaceCart } from '@/app/api/marketplace/carts';
import { normalizeCohortCustomizationsForDisplay } from './utils/normalizeCohortCustomizationsForDisplay';
import { getQuantityDisplay } from './utils/getQuantityDisplay';

jest.mock('./utils/getQuantityDisplay');
jest.mock('./utils/normalizeCohortCustomizationsForDisplay');
jest.mock('@/hooks/useRouteParams', () => ({
  useRouteParams: jest.fn(() => ({ missionPartnerId: '1234' }))
}));

type CartItemType = Awaited<
  ReturnType<typeof sqlGetMarketplaceCart>
>['_serviceData']['marketplaceOrderItems'][number];

describe('CartItem', () => {
  const defaultProps = () => ({
    onCartItemEdit: jest.fn(),
    cartItemData: {
      marketplaceProduct: {
        productType: 'TRAINING',
        title: 'Mock Title'
      },
      cohortCustomizations: []
    } as CartItemType
  });

  beforeEach(() => {
    (normalizeCohortCustomizationsForDisplay as jest.Mock).mockReturnValue([]);
    (getQuantityDisplay as jest.Mock).mockReturnValue('');
  });

  it('renders', () => {
    const props = defaultProps();
    render(<CartItem {...props} />);

    expect(screen.getByText('Training')).toBeInTheDocument();
    expect(
      screen.getByText(props.cartItemData.marketplaceProduct.title)
    ).toBeInTheDocument();
  });

  it('renders the item quantity', () => {
    (getQuantityDisplay as jest.Mock).mockReturnValue('400 X ');

    const props = defaultProps();
    render(<CartItem {...props} />);

    expect(screen.getByText('400 X Mock Title')).toBeInTheDocument();
  });

  it('renders cohort customizations', () => {
    const props = defaultProps();

    const mockDisplayTitle = 'Mock Customization Title';
    const mockDisplayValue = 'Mock Display Value';
    (normalizeCohortCustomizationsForDisplay as jest.Mock).mockReturnValue([
      {
        displayTitle: mockDisplayTitle,
        displayValue: mockDisplayValue
      }
    ]);

    render(<CartItem {...props} />);

    expect(screen.getByText(mockDisplayTitle)).toBeInTheDocument();
    expect(screen.getByText(mockDisplayValue)).toBeInTheDocument();
  });
});
