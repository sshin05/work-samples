import { renderV3, screen, fireEvent } from 'test-utils';
import { AccessDeniedLogoutLink } from './AccessDeniedLogoutLink';
import { useSignOut } from '@/hooks/useCurrentSession/useCurrentSession';
import { getRouteUrl, routeGenerators } from '@/utils/getRouteUrl';

jest.mock('@/hooks/useCurrentSession/useCurrentSession', () => ({
  useSignOut: jest.fn()
}));

jest.mock('@/utils/getRouteUrl', () => ({
  getRouteUrl: jest.fn(),
  routeGenerators: {
    AdminHome: jest.fn()
  }
}));

describe('AccessDeniedLogoutLink', () => {
  it('renders the logout link and triggers signOut on click', () => {
    const signOutMock = jest.fn();
    (useSignOut as jest.Mock).mockReturnValue({ signOut: signOutMock });
    (routeGenerators.AdminHome as jest.Mock).mockReturnValue('/admin-home');
    (getRouteUrl as jest.Mock).mockImplementation(route => route);

    renderV3(<AccessDeniedLogoutLink />);

    const link = screen.getByRole('link', { name: /log out/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/admin-home');

    fireEvent.click(link.parentElement!);
    expect(signOutMock).toHaveBeenCalled();
  });
});
