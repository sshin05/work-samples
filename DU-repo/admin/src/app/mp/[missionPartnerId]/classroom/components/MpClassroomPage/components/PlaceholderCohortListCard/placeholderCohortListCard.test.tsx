import { renderV3 as render } from '@@/test-utils';
import { PlaceholderCohortListCard } from './PlaceholderCohortListCard';

jest.mock('@cerberus/react', () => ({
  ...jest.requireActual('@cerberus/react'),
  CircularProgress: () => <div>CircularProgress</div>
}));

describe('PlaceholderCohortListCard', () => {
  it('renders', () => {
    const { container, getByText } = render(
      <PlaceholderCohortListCard
        numTopTags={2}
        numBottomTags={3}
        circularProgressId="test"
      />
    );
    expect(container).toBeInTheDocument();
    expect(getByText('CircularProgress')).toBeInTheDocument();
  });

  it('renders the correct number of top tags', () => {
    const { container, debug } = render(
      <PlaceholderCohortListCard
        numTopTags={2}
        numBottomTags={3}
        circularProgressId="test"
      />
    );
    debug();
    const topTags = container.querySelectorAll(
      'div > div:nth-child(2) > div:nth-child(1) > div'
    );
    expect(topTags.length).toBe(2);
  });

  it('renders the correct number of bottom tags', () => {
    const { container } = render(
      <PlaceholderCohortListCard
        numTopTags={2}
        numBottomTags={3}
        circularProgressId="test"
      />
    );
    const bottomTags = container.querySelectorAll(
      'div > div:nth-child(2) > div:nth-child(3) > div'
    );
    expect(bottomTags.length).toBe(3);
  });
});
