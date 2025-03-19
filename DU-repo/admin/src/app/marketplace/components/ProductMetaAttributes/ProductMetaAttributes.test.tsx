import { render, screen } from '@@/test-utils';
import { ProductMetaAttributes } from './ProductMetaAttributes';
import type { sqlGetMarketplaceProduct } from '@/app/api/marketplace/products';
import type { sqlGetMarketplaceVendor } from '@/app/api/marketplace/vendors';

type MockProduct = Awaited<
  ReturnType<typeof sqlGetMarketplaceProduct>
>['_serviceData'];
type MockVendor = Awaited<
  ReturnType<typeof sqlGetMarketplaceVendor>
>['_serviceData'];

describe('ProductMetaAttributes', () => {
  it('renders the expected product meta attributes', () => {
    const mockVendor = {
      name: 'Mock Vendor Name'
    };
    const mockProduct = {
      title: 'Mock Product Title',
      productType: 'TRAINING',
      shortDescription: 'Mock Short Description',
      durationInHours: 12,
      locationType: 'OFF_SITE',
      clearanceRequired: 'Mock Clearance',
      instructor: 'Last Name, First Name, Last Name 1, First Name 1'
    };

    render(
      <ProductMetaAttributes
        product={mockProduct as MockProduct}
        vendor={mockVendor as MockVendor}
      />
    );

    expect(screen.getByText(mockVendor.name)).toBeInTheDocument();
    expect(screen.getByText('12 Hours')).toBeInTheDocument();
    expect(screen.getByText('Off-Site')).toBeInTheDocument();
    expect(screen.getByText(mockProduct.clearanceRequired)).toBeInTheDocument();
  });

  it('renders expected resource product meta attributes', () => {
    const mockVendor = {
      name: 'Mock Vendor Name'
    };
    const mockProduct = {
      title: 'Mock Product Title',
      productType: 'RESOURCE',
      shortDescription: 'Mock Short Description',
      durationInHours: 12,
      locationType: 'OFF_SITE',
      clearanceRequired: 'Mock Clearance',
      instructor: 'Last Name, First Name, Last Name 1, First Name 1'
    };

    render(
      <ProductMetaAttributes
        product={mockProduct as MockProduct}
        vendor={mockVendor as MockVendor}
      />
    );

    expect(screen.getByText(mockVendor.name)).toBeInTheDocument();
    expect(screen.getByText('12 Hours')).toBeInTheDocument();
    expect(screen.getByText('Off-Site')).toBeInTheDocument();
    expect(
      screen.queryByText(mockProduct.clearanceRequired)
    ).not.toBeInTheDocument();
  });
});
