import React from 'react';
import { renderV3, screen } from '@@/test-utils';
import { ViewStarRating } from './ViewStarRating';

jest.mock('@digital-u/digital-ui', () => ({
  ...jest.requireActual('@digital-u/digital-ui'),
  Flex: ({ children }) => <div>{children}</div>
}));

jest.mock('@carbon/icons-react', () => ({
  Star: ({ size }) => <div data-testid="empty-star" style={{ width: size }} />,
  StarFilled: ({ size }) => (
    <div data-testid="filled-star" style={{ width: size }} />
  )
}));

jest.mock('../../../src/components/StarRating/HalfFilledStar', () => ({
  ...jest.requireActual('../../../src/components/StarRating/HalfFilledStar'),
  HalfFilledStar: ({ size }) => (
    <div data-testid="half-star" style={{ width: size }} />
  )
}));

describe('ViewStarRating', () => {
  const size = 20;

  it('renders the correct number of filled stars', () => {
    renderV3(<ViewStarRating rating={3} />);
    expect(screen.getAllByTestId('filled-star')).toHaveLength(3);
  });
  it('renders half star correctly for decimal ratings', () => {
    renderV3(<ViewStarRating rating={3.5} size={size} />);
    expect(screen.getAllByTestId('filled-star')).toHaveLength(3);
    expect(screen.getByTestId('half-star')).toBeInTheDocument();
  });

  it('renders all empty stars for a 0 rating', () => {
    renderV3(<ViewStarRating rating={0} size={size} />);
    expect(screen.queryByTestId('filled-star')).not.toBeInTheDocument();
    expect(screen.queryByTestId('half-star')).not.toBeInTheDocument();
    expect(screen.getAllByTestId('empty-star')).toHaveLength(5);
  });

  it('renders all filled stars for a max rating of 5', () => {
    renderV3(<ViewStarRating rating={5} size={size} />);
    expect(screen.getAllByTestId('filled-star')).toHaveLength(5);
    expect(screen.queryByTestId('half-star')).not.toBeInTheDocument();
    expect(screen.queryByTestId('empty-star')).not.toBeInTheDocument();
  });
});
