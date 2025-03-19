import React from 'react';
import { renderV3, screen } from '@@/test-utils';
import { MarketplaceClientWrapper } from './MarketplaceClientWrapper';
import { sqlFindMarketplaceCategories } from '@/app/api/marketplace/products';
import { sqlFindMarketplaceVendors } from '@/app/api/marketplace/vendors';
import { useSQLQuery } from '@/app/api';

type MockProductCategories = Awaited<
  ReturnType<typeof sqlFindMarketplaceCategories>
>['_serviceData']['records'];

type MockVendors = Awaited<
  ReturnType<typeof sqlFindMarketplaceVendors>
>['_serviceData']['records'];

jest.mock('@/app/api/marketplace/products', () => ({
  __esModule: true,
  sqlFindMarketplaceCategories: jest.fn()
}));

jest.mock('@/app/api/marketplace/vendors', () => ({
  __esModule: true,
  sqlFindMarketplaceVendors: jest.fn()
}));

jest.mock('@/app/api', () => ({
  useSQLQuery: jest.fn()
}));

jest.mock('@/hooks/useRouteParams', () => ({
  useRouteParams: jest.fn(() => ({ missionPartnerId: '1234' }))
}));

jest.mock('../MarketplaceHero/MarketplaceHero', () => ({
  MarketplaceHero: () => <div data-testid="marketplace-hero" />
}));

jest.mock('next-auth/react', () => ({
  useSession: jest.fn(() => ({
    data: {
      user: { name: 'Test User', role: 'admin' },
      expires: '9999-12-31T23:59:59.999Z'
    }
  }))
}));

const categoryData: MockProductCategories = [
  {
    id: '1',
    _idx: 1,
    _createdAt: new Date('2021-08-10T14:00:00Z').toISOString(),
    _updatedAt: new Date('2021-08-10T14:00:00Z').toISOString(),
    _table: 'marketplace_categories',
    name: 'Category 1',
    key: 'CATEGORY1',
    description: 'Description for Category 1',
    displayType: 'Published'
  },
  {
    id: '2',
    _idx: 2,
    _createdAt: new Date('2021-08-10T14:00:00Z').toISOString(),
    _updatedAt: new Date('2021-08-10T14:00:00Z').toISOString(),
    _table: 'marketplace_categories',
    name: 'Category 2',
    key: 'CATEGORY2',
    description: 'Description for Category 2',
    displayType: 'Published'
  }
];

const vendorData: MockVendors = [
  {
    id: '1',
    name: 'Vendor 1',
    description: 'Description for Vendor 1',
    logoPath: './test.png',
    imagePath: './test.png',
    _idx: 0,
    _createdAt: new Date('2021-08-10T14:00:00Z').toISOString(),
    _updatedAt: new Date('2021-08-10T14:00:00Z').toISOString(),
    _table: 'marketplace_vendors',
    isArchived: false,
    shortDescription: 'Short description for Vendor 1',
    uniqueTag: 'vendor-1'
  },
  {
    id: '2',
    name: 'Vendor 2',
    description: 'Description for Vendor 2',
    logoPath: './test.png',
    imagePath: './test.png',
    _idx: 1,
    _createdAt: new Date('2021-08-10T14:00:00Z').toISOString(),
    _updatedAt: new Date('2021-08-10T14:00:00Z').toISOString(),
    _table: 'marketplace_vendors',
    isArchived: false,
    shortDescription: 'Short description for Vendor 2',
    uniqueTag: 'vendor-2'
  }
];

describe('ClientWrapper', () => {
  beforeEach(() => {
    (useSQLQuery as jest.Mock).mockImplementation(query => {
      if (query === sqlFindMarketplaceCategories) {
        return { data: categoryData, loading: false, error: null };
      }
      if (query === sqlFindMarketplaceVendors) {
        return { data: vendorData, loading: false, error: null };
      }
      return { data: null, error: 'Unexpected query' };
    });
  });

  describe('Basic Render', () => {
    it('renders the ClientWrapper with categories and vendors', () => {
      renderV3(<MarketplaceClientWrapper />);
      expect(screen.getByTestId('marketplace-hero')).toBeInTheDocument();
      const vendorsTab = screen.getByRole('tab', { name: 'Vendors' });
      const categoriesTab = screen.getByRole('tab', { name: 'Categories' });
      expect(vendorsTab).toBeInTheDocument();
      expect(categoriesTab).toBeInTheDocument();
      expect(categoriesTab).toHaveAttribute('aria-selected', 'true');
      expect(vendorsTab).toHaveAttribute('aria-selected', 'false');
    });
  });

  describe('Loading State', () => {
    it('displays loading skeletons while categories are loading', () => {
      (useSQLQuery as jest.Mock).mockImplementationOnce(query => {
        if (query === sqlFindMarketplaceCategories) {
          return { data: [], loading: true, error: null };
        }
        return { data: null, loading: false, error: 'Unexpected query' };
      });

      renderV3(<MarketplaceClientWrapper />);

      const skeletons = screen.getAllByRole('status');
      expect(skeletons.length).toBe(3);

      skeletons.forEach(skeleton => {
        expect(skeleton).toHaveAttribute('aria-busy', 'true');
      });
    });
  });
});
