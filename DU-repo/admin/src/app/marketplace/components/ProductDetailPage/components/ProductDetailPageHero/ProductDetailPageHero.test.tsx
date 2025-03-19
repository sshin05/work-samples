import { fireEvent, render, screen } from '@@/test-utils';
import type { sqlGetMarketplaceProduct } from '@/app/api/marketplace/products';
import type { sqlGetMarketplaceVendor } from '@/app/api/marketplace/vendors';
import { ProductDetailPageHero } from './ProductDetailPageHero';
import { CTA_TEXT } from './ProductDetailPageHero.constants';

type MockProduct = Awaited<
  ReturnType<typeof sqlGetMarketplaceProduct>
>['_serviceData'];
type MockVendor = Awaited<
  ReturnType<typeof sqlGetMarketplaceVendor>
>['_serviceData'];

jest.mock('@/hooks/useRouteParams', () => ({
  useRouteParams: jest.fn(() => ({
    missionPartnerId: '1234'
  }))
}));

jest.mock('next/navigation', () => ({
  usePathname: jest.fn().mockReturnValue('')
}));

jest.mock('next-auth/react', () => ({
  useSession: jest.fn(() => ({
    data: {
      user: { name: 'Test User', role: 'admin' },
      expires: '9999-12-31T23:59:59.999Z'
    }
  }))
}));

describe('ProductDetailPageHero', () => {
  const onAddAndCustomizeButtonClickSpy = jest.fn();

  it('renders with an empty product and vendor', () => {
    const mockVendor = {} as Awaited<
      ReturnType<typeof sqlGetMarketplaceVendor>
    >['_serviceData'];
    const mockProduct = {} as Awaited<
      ReturnType<typeof sqlGetMarketplaceProduct>
    >['_serviceData'];

    render(
      <ProductDetailPageHero
        product={mockProduct}
        vendor={mockVendor}
        onAddAndCustomizeButtonClick={onAddAndCustomizeButtonClickSpy}
        loading={false}
      />
    );

    expect(screen.getByText(CTA_TEXT)).toBeInTheDocument();
  });

  it('calls the expected function when the Add and Customize button is clicked', () => {
    const mockVendor = {} as MockVendor;
    const mockProduct = {} as MockProduct;

    render(
      <ProductDetailPageHero
        product={mockProduct}
        vendor={mockVendor}
        onAddAndCustomizeButtonClick={onAddAndCustomizeButtonClickSpy}
        loading={false}
      />
    );

    expect(onAddAndCustomizeButtonClickSpy).not.toHaveBeenCalled();

    const button = screen.getByText(CTA_TEXT);
    fireEvent.click(button);

    expect(onAddAndCustomizeButtonClickSpy).toHaveBeenCalledTimes(1);
  });

  it('renders the expected fields when present on the product', () => {
    const mockVendor = {
      name: 'Mock Vendor Name'
    } as MockVendor;
    const mockProduct = {
      title: 'Mock Product Title',
      productType: 'Mock Product Type',
      shortDescription: 'Mock Short Description',
      instructor: 'Last Name, First Name, Last Name 1, First Name 1'
    } as unknown as MockProduct;

    render(
      <ProductDetailPageHero
        product={mockProduct}
        vendor={mockVendor}
        onAddAndCustomizeButtonClick={onAddAndCustomizeButtonClickSpy}
        loading={false}
      />
    );

    expect(screen.getByText(mockVendor.name)).toBeInTheDocument();

    expect(
      screen.getByText(mockProduct.productType.toLowerCase())
    ).toBeInTheDocument();
    expect(screen.getAllByText(mockProduct.title)[1]).toBeInTheDocument();
    expect(screen.getByText(mockProduct.shortDescription)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.instructor)).toBeInTheDocument();
  });

  describe('product category display', () => {
    it('renders the category name', () => {
      const mockVendor = {} as MockVendor;
      const mockProduct = {
        category: {
          name: 'Mock Category Name'
        }
      } as MockProduct;

      render(
        <ProductDetailPageHero
          product={mockProduct}
          vendor={mockVendor}
          onAddAndCustomizeButtonClick={onAddAndCustomizeButtonClickSpy}
          loading={false}
        />
      );
      expect(
        screen.getAllByText(mockProduct.category.name)[1]
      ).toBeInTheDocument();
    });
  });
});
