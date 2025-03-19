import BannerCard from '../../src/components/settings-banner/banner-card/BannerCard';
import { render, screen } from '@@/test-utils';

jest.mock('@digital-u/digital-ui', () => ({
  ...jest.requireActual('@digital-u/digital-ui'),
  Text: ({ children }) => <span>{children}</span>,
  Flex: ({ children }) => <div>{children}</div>,
  Button: ({ children, onClick }) => (
    <button onClick={onClick}>{children}</button>
  )
}));

jest.mock('@/components_new/loaders', () => ({
  BaseSkeleton: () => <div>BaseSkeleton</div>
}));

jest.mock('@carbon/icons-react', () => ({
  Launch: () => <div>Launch</div>
}));
jest.mock(
  '../../src/components/settings-banner/banner-card/BannerImagePreviewer',
  () => () => {
    return <div>BannerImagePreviewer</div>;
  }
);

window.URL.createObjectURL = jest.fn();

const BannerData = {
  title: 'title',
  description: 'description',
  href: '/link',
  image: new File(['hello'], 'hello.png', { type: 'image/png' }),
  buttonText: 'button',
  loading: false
};

describe('banner-card', () => {
  it('should render a banner card', () => {
    render(<BannerCard {...BannerData} />);
  });
  it('should render banner data', () => {
    render(<BannerCard {...BannerData} />);

    expect(screen.getByText('title')).toBeInTheDocument();
    expect(screen.getByText('description')).toBeInTheDocument();
    expect(screen.getByText('button')).toBeInTheDocument();
    expect(screen.getByText('BannerImagePreviewer')).toBeInTheDocument();
  });
  it('should render default banner data', () => {
    render(<BannerCard loading={false} />);

    expect(screen.getByText('Card Title')).toBeInTheDocument();
    expect(screen.getByText('Body Copy')).toBeInTheDocument();
    expect(screen.getByText('Button Copy')).toBeInTheDocument();
    expect(screen.getByText('BannerImagePreviewer')).toBeInTheDocument();
  });

  it('should render load states when loading is true', () => {
    render(<BannerCard {...BannerData} loading={true} />);

    expect(screen.getAllByText('BaseSkeleton').length).toBe(4);
    expect(screen.queryByText('title')).not.toBeInTheDocument();
    expect(screen.queryByText('description')).not.toBeInTheDocument();
    expect(screen.queryByText('button')).not.toBeInTheDocument();
    expect(screen.queryByText('BannerImagePreviewer')).not.toBeInTheDocument();
  });
});
