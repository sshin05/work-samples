import React from 'react';
import { render, screen } from '@@/test-utils';
import VendorProductListPage from './page';
import { sqlFindMarketplaceProducts } from '@/app/api/marketplace/products';
import { sqlGetMarketplaceVendor } from '@/app/api/marketplace/vendors';
import { useRouteParams } from '@/hooks/useRouteParams';
import { useGetUser } from '@/api/user';

jest.mock('@/api/user');
jest.mock('next-auth/react');
jest.mock('@/hooks/useRouteParams');
jest.mock(
  '@/app/marketplace/components/ProductListPage/ProductListPage',
  () => ({
    ProductListPage: () => <div>Mock Vendor Product List Page</div>
  })
);
jest.mock('@/app/api/marketplace/products', () => ({
  sqlFindMarketplaceProducts: jest.fn()
}));

jest.mock('@/app/api/marketplace/vendors', () => ({
  sqlGetMarketplaceVendor: jest.fn()
}));

jest.mock('@/app/api/marketplace/carts', () => ({
  sqlGetMarketplaceCart: jest.fn()
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useParams: jest.fn(() => ({ missionPartnerId: 'test' })),
  usePathname: jest.fn(() => '/test-path')
}));

const mockVendors = [
  {
    id: 'vendor-1',
    name: 'Vendor One',
    description: 'Vendor One description.'
  },
  {
    id: 'vendor-2',
    name: 'Vendor Two',
    description: 'Vendor Two description.'
  }
];

const mockProducts = [
  {
    id: 'prod-1',
    title: 'Test Product One',
    category: {
      id: 'cat-1'
    },
    productType: 'TRAINING'
  },
  {
    id: 'prod-2',
    title: 'Test Product Two',
    category: {
      id: 'cat-2'
    },
    productType: 'RESOURCE'
  }
];

const mockUser = {
  firstName: 'John',
  lastName: 'Doe'
};

describe('VendorProductListPage', () => {
  beforeEach(() => {
    (useRouteParams as jest.Mock).mockReturnValue({
      marketplaceVendorTag: 'vendor-1',
      missionPartnerId: 'partner-1'
    });

    (useGetUser as jest.Mock).mockReturnValue({
      user: mockUser,
      userLoading: false
    });

    (sqlGetMarketplaceVendor as jest.Mock).mockResolvedValue({
      data: mockVendors[0]
    });

    (sqlFindMarketplaceProducts as jest.Mock).mockResolvedValue({
      data: { records: mockProducts }
    });
  });

  describe('Basic Render', () => {
    it('renders the ProductListPage with initial vendor id', async () => {
      render(<VendorProductListPage />);

      expect(
        screen.getByText('Mock Vendor Product List Page')
      ).toBeInTheDocument();
    });
  });
});
