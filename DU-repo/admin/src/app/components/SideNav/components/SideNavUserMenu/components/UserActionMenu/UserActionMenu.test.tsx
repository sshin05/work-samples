import { UserActionMenu } from './UserActionMenu';
import { renderV3, screen } from '@@/test-utils';

jest.mock('./components/UserActionMenuItems', () => ({
  UserActionMenuItems: jest.fn(() => <div>Mock Menu Items</div>)
}));

describe('UserActionMenu', () => {
  it('renders the UserActionMenu component', () => {
    renderV3(<UserActionMenu />);
    expect(screen.getByLabelText('icon-button')).toBeInTheDocument();
    expect(screen.getByText('Mock Menu Items')).toBeInTheDocument();
  });
});
