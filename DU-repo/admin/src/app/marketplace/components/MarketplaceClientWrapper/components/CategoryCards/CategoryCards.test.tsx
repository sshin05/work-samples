import React from 'react';
import { renderV3, screen } from '@@/test-utils';
import { CategoryCards, type MarketplaceCategory } from './CategoryCards';

const mockCategories: MarketplaceCategory[] = [
  { key: '1', name: 'Category 1', description: 'Description 1' },
  { key: '2', name: 'Category 2', description: 'Description 2' }
];

describe('CategoryCards', () => {
  describe('Basic Render', () => {
    it('renders a list of category cards based on props', () => {
      renderV3(
        <CategoryCards
          missionPartnerId="partner-123"
          categories={mockCategories}
        />
      );

      mockCategories.forEach(category => {
        expect(screen.getByText(category.name)).toBeInTheDocument();
        expect(screen.getByText(category.description)).toBeInTheDocument();
      });
    });
  });
});
