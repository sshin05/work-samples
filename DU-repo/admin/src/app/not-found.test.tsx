import { render, screen } from '@@/test-utils';
import { getRouteUrl, routeGenerators } from '@/utils/getRouteUrl';
import NotFound404Page from './not-found';

jest.mock('@/utils/getRouteUrl/getRouteUrl');
jest.mock('@/utils/getRouteUrl/utils/routeGenerators/routeGenerators');

beforeEach(() => {
  (getRouteUrl as jest.Mock).mockReturnValue('/admin/mp/test');
  (routeGenerators.AdminHome as jest.Mock).mockReturnValue('admin-home');
});

describe('404 Component', () => {
  it('should render the not found message', () => {
    render(<NotFound404Page />);
    expect(screen.getByText('Page not found')).toBeInTheDocument();
  });

  it('renders the "Go back home" button with correct link', () => {
    render(<NotFound404Page />);

    const linkElement = screen.getByRole('link', { name: /Go back home/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', '/admin/mp/test');

    const buttonElement = screen.getByRole('button', { name: /Go back home/i });
    expect(buttonElement).toBeInTheDocument();
  });
});
