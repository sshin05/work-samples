import { render, screen, waitFor, userEvent } from '@@/test-utils';
import ItemCard from './ItemCard';

jest.mock('@cerberus/react', () => ({
  Button: ({ children, onClick, ...props }) => (
    <button {...props} onClick={onClick}>
      {children}
    </button>
  ),
  IconButton: ({ children, onClick, ariaLabel, ...props }) => (
    <button {...props} onClick={onClick} aria-label={ariaLabel}>
      {children}
    </button>
  ),
  Tag: ({ children }) => <div>{children}</div>
}));

jest.mock('@/components_new/icons/VendorIconGroup', () => ({
  VendorIconGroup: ({ vendors }) => <div>{vendors[0]}</div>
}));

jest.mock('@/components/shopping-cart/OrderSummary/CartItemTypeIcon', () => ({
  CartItemTypeIcon: ({ type }) => <div>{type}</div>
}));

describe('ItemCard', () => {
  const item = {
    id: 1,
    version: 1,
    __typename: 'Item Typename',
    name: 'Item Name',
    source: 'Item Source'
  };

  const onAddToCart = jest.fn();

  const props = {
    item,
    title: 'Item Title',
    description: 'Item Description',
    duration: 180,
    previewUrl: '/preview',
    vendorIconProp: 'Vendor Icon Prop',
    isItemInCart: false,
    isItemAlreadyAttachedToTarget: true,
    onAddToCart,
    checkingOut: false,
    setShowPreviewFor: jest.fn(),
    rating: 3.5,
    totalReviews: 56
  };

  it('renders ItemCard component', () => {
    render(<ItemCard {...props} />);

    expect(screen.getByText(/item typename/i)).toBeInTheDocument();
    expect(screen.getByText('Item Title (v1)')).toBeInTheDocument();

    expect(screen.getByText(props.vendorIconProp)).toBeInTheDocument();
    expect(screen.getByText(props.duration)).toBeInTheDocument();
  });

  it('renders add to cart on mouse enter', async () => {
    render(<ItemCard {...props} />);

    userEvent.hover(screen.getByText(/item typename/i));
    await waitFor(() => {
      expect(screen.getByLabelText(/add to cart/i)).toBeInTheDocument();
    });
  });

  it('should disable the remove button when checkingOut is true', async () => {
    render(<ItemCard {...props} checkingOut />);
    await waitFor(async () => {
      userEvent.hover(screen.getByText(/item typename/i));
      expect(screen.getByLabelText(/add to cart/i)).toBeInTheDocument();
    });
    expect(screen.getByLabelText(/add to cart/i)).toBeDisabled();
  });

  it('should call onAddToCart when item is not in the cart', async () => {
    render(
      <ItemCard
        {...props}
        isItemInCart={false}
        isItemAlreadyAttachedToTarget={false}
      />
    );
    await waitFor(async () => {
      userEvent.hover(screen.getByText(/item typename/i));
      expect(screen.getByLabelText(/add to cart/i)).toBeInTheDocument();
    });
    screen.getByLabelText(/add to cart/i).click();
    expect(onAddToCart).toHaveBeenCalled();
  });

  it('window.open should be called when the preview button is clicked', async () => {
    const openMock = jest.fn();
    Object.defineProperty(window, 'open', { value: openMock });
    render(
      <ItemCard
        {...props}
        isItemInCart={false}
        isItemAlreadyAttachedToTarget={false}
      />
    );
    await waitFor(async () => {
      userEvent.hover(screen.getByText(/item typename/i));
      expect(screen.queryByText(/preview/i)).toBeInTheDocument();
    });
    screen.getByText(/preview/i).click();
    expect(openMock).toHaveBeenCalledWith(props.previewUrl, '_blank');
  });

  it('should not show preview button when item is a ForceMultiplier', async () => {
    const fmItem = {
      id: 2,
      __typename: 'ForceMultiplier',
      title: 'Javascript Force Multiplier',
      duration: 180,
      description: 'content summary',
      vendorId: 'vendorId'
    };

    const props = {
      item: fmItem,
      title: fmItem.title,
      description: fmItem.description,
      duration: fmItem.duration,
      previewUrl: undefined,
      vendorIconProp: undefined,
      isItemInCart: false,
      isItemAlreadyAttachedToTarget: true,
      onAddToCart,
      checkingOut: true,
      setShowPreviewFor: jest.fn(),
      rating: 4.1,
      totalReviews: 14
    };

    render(<ItemCard {...props} />);
    await waitFor(async () => {
      userEvent.hover(screen.getByText(/Javascript Force Multiplier/i));
      expect(screen.queryByText(/preview/i)).not.toBeInTheDocument();
    });
  });

  it('should not show preview button when item is a Skill', async () => {
    const skillItem = {
      id: 2,
      __typename: 'Skill',
      title: 'Javascript Skill',
      duration: 180,
      description: 'skill summary',
      vendorId: 'vendorId'
    };

    const props = {
      item: skillItem,
      title: skillItem.title,
      description: skillItem.description,
      duration: skillItem.duration,
      previewUrl: undefined,
      vendorIconProp: undefined,
      isItemInCart: false,
      isItemAlreadyAttachedToTarget: false,
      onAddToCart,
      setShowPreviewFor: jest.fn(),
      rating: 1.2,
      totalReviews: 9
    };

    render(<ItemCard {...props} />);
    await waitFor(async () => {
      userEvent.hover(screen.getByText(/Javascript Skill/i));
      expect(screen.queryByText(/preview/i)).not.toBeInTheDocument();
    });
  });

  it('should not show preview button when item is a LearningPath', async () => {
    const lpItem = {
      id: 3,
      __typename: 'LearningPath',
      title: 'Javascript Learning Path',
      duration: 180,
      description: 'lp summary',
      vendorId: 'vendorId'
    };

    const props = {
      item: lpItem,
      title: lpItem.title,
      description: lpItem.description,
      duration: lpItem.duration,
      previewUrl: undefined,
      vendorIconProp: undefined,
      isItemInCart: false,
      isItemAlreadyAttachedToTarget: true,
      onAddToCart,
      checkingOut: false,
      setShowPreviewFor: jest.fn(),
      rating: 3.2,
      totalReviews: 87
    };

    render(<ItemCard {...props} />);
    await waitFor(async () => {
      userEvent.hover(screen.getByText(/LearningPath/i));
      expect(screen.queryByText(/preview/i)).not.toBeInTheDocument();
    });
  });

  it('should set the preview when a du-create preview is clicked', async () => {
    const customItem = {
      id: 2,
      __typename: 'Item Typename',
      name: 'Item Name',
      source: 'du-create'
    };

    const setShowPreviewFor = jest.fn();
    const props = {
      item: customItem,
      title: 'Item Name',
      description: 'Item Description',
      duration: 180,
      previewUrl: undefined,
      vendorIconProp: undefined,
      isItemInCart: false,
      isItemAlreadyAttachedToTarget: false,
      onAddToCart,
      checkingOut: false,
      setShowPreviewFor,
      rating: 2.2,
      totalReviews: 34
    };

    render(<ItemCard {...props} setShowPreviewFor={setShowPreviewFor} />);
    await waitFor(async () => {
      userEvent.hover(screen.getByText(/item typename/i));
      expect(screen.getByText(/preview/i)).toBeInTheDocument();
    });
    screen.getByText('Preview').click();
    expect(setShowPreviewFor).toHaveBeenCalledWith(customItem);
  });

  it('should render button as "Featured" when it is a currently featured item', () => {
    render(
      <ItemCard
        {...props}
        isCurrentlyFeaturedItem
        isItemInCart={false}
        checkingOut={false}
        isItemAlreadyAttachedToTarget={false}
      />
    );
    const featuredButton = screen.getByText(/featured/i);
    expect(featuredButton).toBeInTheDocument();
    expect(featuredButton).toBeDisabled();
  });
});
