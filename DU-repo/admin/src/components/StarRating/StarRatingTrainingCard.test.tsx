import { renderV3, screen } from '@@/test-utils';
import { StarRatingTrainingCard } from './StarRatingTrainingCard';

jest.mock('@cerberus/icons', () => ({
  StarFilled: jest.fn(() => <span>StarFilled</span>),
  Star: jest.fn(() => <span>Star</span>)
}));

describe('StarRating component', () => {
  it('does not render with invalid ratings (NaN)', () => {
    renderV3(<StarRatingTrainingCard ratings={NaN} filled={true} />);
    expect(screen.queryByText('NaN')).not.toBeInTheDocument();
  });

  it('does not render with ratings below 0', () => {
    renderV3(<StarRatingTrainingCard ratings={-1} filled={true} />);
    expect(screen.queryByText('-1')).not.toBeInTheDocument();
  });

  it('does not render with ratings above 5', () => {
    renderV3(<StarRatingTrainingCard ratings={6} filled={false} />);
    expect(screen.queryByText('6.0')).not.toBeInTheDocument();
  });

  it('does render with ratings between 0 and 5', () => {
    renderV3(<StarRatingTrainingCard ratings={3.5} filled={false} />);
    expect(screen.getByText('3.5')).toBeInTheDocument();
  });
});
