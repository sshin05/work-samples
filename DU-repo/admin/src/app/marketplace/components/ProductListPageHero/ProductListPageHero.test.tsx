import { screen, render } from '@@/test-utils';
import { ProductListPageHero } from './ProductListPageHero';

jest.mock('@/hooks/useRouteParams', () => ({
  useRouteParams: jest.fn(() => ({ missionPartnerId: 'mock-mp-id' }))
}));

jest.mock('@cerberus/react', () => ({
  Text: jest.fn(({ children }) => <div>{children}</div>),
  Tag: jest.fn(({ children }) => <div>{children}</div>),
  Button: jest.fn(({ children, onClick }) => (
    <button onClick={onClick}>{children}</button>
  )),
  Show: jest.fn(({ children, when }) => (when ? <div>{children}</div> : null))
}));

const defaultProps = {
  loading: false,
  title: 'Mock Title',
  description: 'Mock Description',
  tagCounts: { trainings: 3, resources: 1 },
  onAboutClick: jest.fn()
};

describe('ProductListPageHero', () => {
  describe('Basic Render', () => {
    it('renders', () => {
      const title = 'Mock Title';
      const description = 'Mock Description';

      render(<ProductListPageHero {...defaultProps} />);

      expect(
        screen.getByRole('navigation', { name: /breadcrumbs/i })
      ).toBeInTheDocument();
      expect(screen.getAllByText(title)[1]).toBeInTheDocument();
      expect(screen.getByText(description)).toBeInTheDocument();
      expect(screen.getByText(/3 Trainings/)).toBeInTheDocument();
      expect(screen.getByText(/1 Resource/)).toBeInTheDocument();
    });
  });

  describe('Product Tag Types', () => {
    it('renders no tags', () => {
      const tagCounts = { trainings: 0, resources: 0 };
      render(<ProductListPageHero {...defaultProps} tagCounts={tagCounts} />);

      expect(screen.queryByText(/Training(s)?/)).not.toBeInTheDocument();
      expect(screen.queryByText(/Resource(s)?/)).not.toBeInTheDocument();
    });

    it('renders one training', () => {
      const tagCounts = { trainings: 1, resources: 0 };
      render(<ProductListPageHero {...defaultProps} tagCounts={tagCounts} />);

      expect(screen.queryByText(/1 Training/)).toBeInTheDocument();
      expect(screen.queryByText(/Resource(s)?/)).not.toBeInTheDocument();
    });

    it('renders multiple trainings', () => {
      const tagCounts = { trainings: 2, resources: 0 };
      render(<ProductListPageHero {...defaultProps} tagCounts={tagCounts} />);

      expect(screen.queryByText(/2 Trainings/)).toBeInTheDocument();
      expect(screen.queryByText(/Resource(s)?/)).not.toBeInTheDocument();
    });

    it('renders one resource', () => {
      const tagCounts = { trainings: 0, resources: 1 };
      render(<ProductListPageHero {...defaultProps} tagCounts={tagCounts} />);

      expect(screen.queryByText(/Training(s)?/)).not.toBeInTheDocument();
      expect(screen.queryByText(/1 Resource/)).toBeInTheDocument();
    });

    it('renders multiple resources', () => {
      const tagCounts = { trainings: 0, resources: 2 };
      render(<ProductListPageHero {...defaultProps} tagCounts={tagCounts} />);

      expect(screen.queryByText(/Training(s)?/)).not.toBeInTheDocument();
      expect(screen.queryByText(/2 Resources/)).toBeInTheDocument();
    });
  });
});
