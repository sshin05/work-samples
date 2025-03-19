import { render, screen } from '@@/test-utils';
import { SideNavUserMenu } from './SideNavUserMenu';

jest.mock('./components/UserActionMenu', () => ({
  UserActionMenu: () => <button>User Action Menu</button>
}));

describe('SideNavUserMenu', () => {
  it('renders the logo and admin portal text', () => {
    render(<SideNavUserMenu />);
    expect(
      screen.getByAltText('Digital University Admin Logo')
    ).toBeInTheDocument();
  });

  it('renders the UserActionMenu component', () => {
    render(<SideNavUserMenu />);
    expect(screen.getByText('User Action Menu')).toBeInTheDocument();
  });
});
