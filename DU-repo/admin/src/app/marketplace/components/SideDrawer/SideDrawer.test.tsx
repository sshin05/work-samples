import { screen, render } from '@@/test-utils';
import { SideDrawer } from '.';
import { ShoppingCart } from '@cerberus/icons';
import { useMarketplace } from '../../hooks/useMarketplace';
import { USE_MARKETPLACE_MOCK_RETURN_VALUE } from '../../hooks/useMarketplace/testing/mocks';

jest.mock('@/app/marketplace/hooks/useMarketplace');

describe('SideDrawer', () => {
  const defaultProps = () => ({
    title: 'Cart',
    subtitle: 'Subtitle Text',
    HeaderIcon: ShoppingCart,
    onCloseIconClick: jest.fn(),
    onExited: jest.fn(),
    isOpen: true
  });

  beforeAll(() => {
    (useMarketplace as jest.Mock).mockReturnValue(
      USE_MARKETPLACE_MOCK_RETURN_VALUE
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders', () => {
    const props = defaultProps();
    render(<SideDrawer {...props}>Mock Child</SideDrawer>);

    expect(screen.getByText('Mock Child')).toBeInTheDocument();
    expect(screen.getByText(props.title)).toBeInTheDocument();
    expect(screen.getByText(props.subtitle)).toBeInTheDocument();
  });

  it('calls onSideDrawerOpen', () => {
    const onSideDrawerOpenSpy = jest.fn();

    (useMarketplace as jest.Mock).mockReturnValue({
      ...USE_MARKETPLACE_MOCK_RETURN_VALUE,
      onSideDrawerOpen: onSideDrawerOpenSpy
    });

    const onCloseIconClickSpy = jest.fn();
    const drawerProps = {
      ...defaultProps(),
      onCloseIconClick: onCloseIconClickSpy,
      title: 'drawer-0'
    };

    render(<SideDrawer {...drawerProps}>Drawer Content</SideDrawer>);

    expect(onSideDrawerOpenSpy).toHaveBeenCalledTimes(1);
  });

  it("closes when the marketplace's open side drawer title changes", () => {
    (useMarketplace as jest.Mock).mockReturnValue({
      ...USE_MARKETPLACE_MOCK_RETURN_VALUE,
      marketplaceOpenSideDrawerTitle: null
    });

    const onCloseIconClickSpy = jest.fn();
    const drawerProps = {
      ...defaultProps(),
      onCloseIconClick: onCloseIconClickSpy,
      title: 'drawer-0'
    };

    const { rerender } = render(
      <SideDrawer {...drawerProps}>Drawer Content</SideDrawer>
    );

    expect(onCloseIconClickSpy).toHaveBeenCalledTimes(0);

    (useMarketplace as jest.Mock).mockReturnValue({
      ...USE_MARKETPLACE_MOCK_RETURN_VALUE,
      marketplaceOpenSideDrawerTitle: 'A Different Drawer Title'
    });

    rerender(<SideDrawer {...drawerProps}>Drawer Content</SideDrawer>);

    expect(onCloseIconClickSpy).toHaveBeenCalledTimes(1);
  });
});
