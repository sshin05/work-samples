import React from 'react';
import { renderV3, screen } from '@@/test-utils';
import { ProductListPage } from './ProductListPage';
import type { sqlGetMarketplaceProduct } from '@/app/api/marketplace/products';

type MockProduct = Awaited<
  ReturnType<typeof sqlGetMarketplaceProduct>
>['_serviceData'];

jest.mock('../TopNav/TopNav', () => ({
  TopNav: () => <div data-testid="top-nav" />
}));

jest.mock('../MarketplaceCardsContainer/MarketplaceCardsContainer', () => ({
  MarketplaceCardsContainer: ({ children }) => (
    <div data-testid="marketplace-cards-container">{children}</div>
  )
}));

jest.mock('../ProductCard/ProductCard', () => ({
  ProductCard: ({ product }) => (
    <div data-testid="product-card">{product?.title}</div>
  )
}));

jest.mock('../ProductListPageHero/ProductListPageHero', () => ({
  ProductListPageHero: ({ title, description, tagCounts }) => (
    <div data-testid="product-list-page-hero">
      <h1>{title}</h1>
      <p>{description}</p>
      <span>Mock Training Count: {tagCounts.trainings}</span>
      <span>Mock Resource Count: {tagCounts.resources}</span>
    </div>
  )
}));

const mockProducts = [
  {
    id: 'prod-1',
    title: 'Product One',
    productType: 'TRAINING',
    category: { id: 'cat-1' }
  },
  {
    id: 'prod-2',
    title: 'Product Two',
    productType: 'TRAINING',
    category: { id: 'cat-1' }
  },
  {
    id: 'prod-3',
    title: 'Product Three',
    productType: 'TRAINING',
    category: { id: 'cat-1' }
  },
  {
    id: 'prod-4',
    title: 'Product Four',
    productType: 'RESOURCE',
    category: { id: 'cat-2' }
  }
];

describe('ProductListPage', () => {
  const defaultProps = {
    loading: false,
    pageTitle: 'Page Title',
    heroDescription: 'A nice description.',
    products: mockProducts as MockProduct[]
  };

  describe('Basic Render', () => {
    it('renders child components', () => {
      renderV3(<ProductListPage {...defaultProps} />);

      expect(screen.getByTestId('top-nav')).toBeInTheDocument();
      expect(screen.getByTestId('product-list-page-hero')).toBeInTheDocument();
      expect(screen.getByText(defaultProps.pageTitle)).toBeInTheDocument();
      expect(
        screen.getByText(defaultProps.heroDescription)
      ).toBeInTheDocument();

      expect(
        screen.getByTestId('marketplace-cards-container')
      ).toBeInTheDocument();
      const productCards = screen.getAllByTestId('product-card');
      expect(productCards).toHaveLength(mockProducts.length);
    });
  });

  describe('Tag Counts', () => {
    it('calculates the correct tag counts', () => {
      renderV3(<ProductListPage {...defaultProps} />);

      const trainingsCount = screen.getByText(/Mock Training Count: 3/);
      const resourcesCount = screen.getByText(/Mock Resource Count: 1/);
      expect(trainingsCount).toBeInTheDocument();
      expect(resourcesCount).toBeInTheDocument();
    });
  });
});
