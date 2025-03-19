import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { createMockClient, type MockApolloClient } from 'mock-apollo-client';
import { useSession } from 'next-auth/react';
import { useRouteParams } from '@/hooks/useRouteParams';
import CategoryProductListPage from './page';
import { renderV3, screen } from '@@/test-utils';
import {
  sqlFindMarketplaceCategories,
  sqlFindMarketplaceProducts
} from '@/app/api/marketplace/products';
import { sqlGetMarketplaceCart } from '@/app/api/marketplace/carts';
import { useSQLQuery } from '@/app/api';

jest.mock('next-auth/react');
jest.mock('@/app/marketplace/components/TopNav/TopNav', () => ({
  TopNav: () => <div></div>
}));
jest.mock('@/app/api/marketplace/products', () => ({
  sqlFindMarketplaceCategories: jest.fn(),
  sqlFindMarketplaceProducts: jest.fn(),
  sqlGetMarketplaceCart: jest.fn()
}));

jest.mock('@/app/api/marketplace/carts', () => ({
  sqlGetMarketplaceCart: jest.fn()
}));

jest.mock('@/app/api', () => ({
  useSQLQuery: jest.fn()
}));

jest.mock('@/hooks/useRouteParams');

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useParams: jest.fn(() => ({ missionPartnerId: 'test' })),
  usePathname: jest.fn(() => '/test-path')
}));

jest.mock(
  '@/app/marketplace/components/ProductListPage/ProductListPage',
  () => {
    return {
      ProductListPage: () => <div>MockProductListPage</div>
    };
  }
);

const mockCategories = [
  {
    id: 'cat-1',
    name: 'Acquisitions and Contracting',
    description: 'A very good test item.'
  },
  {
    id: 'cat-2',
    name: 'Exercise Support',
    description: 'Another very good test item.'
  }
];

const mockProducts = [
  {
    id: 'prod-1',
    title: 'Test Product One',
    category: { id: 'cat-1' },
    productType: 'TRAINING'
  }
];

const mockSession = {
  expires: '1',
  user: { email: 'foo@bar.com', name: 'foo bar', roles: ['admin'] }
};

let mockClient: MockApolloClient;
beforeAll(() => {
  (useSession as jest.Mock).mockReturnValue({
    data: mockSession
  });
  mockClient = createMockClient();
});

describe('CategoryProductListPage', () => {
  beforeEach(() => {
    (useRouteParams as jest.Mock).mockReturnValue({
      categoryId: 'cat-1',
      missionPartnerId: 'partner-1'
    });

    (useSQLQuery as jest.Mock).mockImplementation(query => {
      if (query === sqlFindMarketplaceCategories) {
        return { data: mockCategories, error: null };
      }
      if (query === sqlFindMarketplaceProducts) {
        return { data: { records: mockProducts }, error: null };
      }
      if (query === sqlGetMarketplaceCart) {
      }
      return { data: null, error: 'Unexpected query' };
    });
  });

  describe('Basic Render', () => {
    it('renders the ProductListPage with initial category id', () => {
      renderV3(
        <ApolloProvider client={mockClient}>
          <CategoryProductListPage />
        </ApolloProvider>
      );

      expect(screen.getByText('MockProductListPage')).toBeInTheDocument();
    });
  });
});
