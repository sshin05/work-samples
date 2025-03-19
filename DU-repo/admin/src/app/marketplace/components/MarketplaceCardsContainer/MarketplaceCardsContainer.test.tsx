import React from 'react';
import { renderV3, screen } from '@@/test-utils';
import { MarketplaceCardsContainer } from './MarketplaceCardsContainer';

describe('MarketplaceCardsContainer', () => {
  const childOneText = 'Child One';
  const childTwoText = 'Child Two';

  describe('Basic Render', () => {
    it('renders the children', () => {
      renderV3(
        <MarketplaceCardsContainer>
          <div>{childOneText}</div>
          <div>{childTwoText}</div>
        </MarketplaceCardsContainer>
      );

      const childElementOne = screen.getByText(childOneText);
      expect(childElementOne).toBeInTheDocument();
      const childElementTwo = screen.getByText(childTwoText);
      expect(childElementTwo).toBeInTheDocument();
    });
  });
});
