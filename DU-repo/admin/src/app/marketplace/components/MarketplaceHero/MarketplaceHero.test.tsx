import { renderV3, screen } from '@@/test-utils';
import { TopNav } from '../TopNav/TopNav';
import { MarketplaceHero } from './MarketplaceHero';

jest.mock('../TopNav/TopNav', () => ({
  TopNav: jest.fn(() => <div data-testid="top-nav" />)
}));

describe('MarketplaceHero Component', () => {
  beforeEach(() => {
    (TopNav as jest.Mock).mockImplementation(() => (
      <div data-testid="top-nav" />
    ));
  });

  describe('Basic Render', () => {
    it('renders the MarketplaceHero component', () => {
      renderV3(<MarketplaceHero />);

      expect(screen.getByTestId('top-nav')).toBeInTheDocument();
      expect(screen.getByRole('banner')).toBeInTheDocument();

      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toBeInTheDocument();

      expect(heading).toHaveTextContent(
        /ACQUIRE TRAINING AT THE.*SPEED OF MISSION\./
      );
    });
  });
});
