import { useRouter } from 'next/navigation';
import { TopNavUser } from './TopNavUser';
import { useSignOut , useIsDuAdmin } from '@/hooks/useCurrentSession/useCurrentSession';
import { fireEvent, renderV3, screen } from '@@/test-utils';
import { USE_MARKETPLACE_MOCK_RETURN_VALUE } from '@/app/marketplace/hooks/useMarketplace/testing/mocks';
import { useGetSession } from '@/hooks/useGetSession';

jest.mock('@/api/user');
jest.mock('@/hooks/useGetSession');
jest.mock('@/app/marketplace/hooks/useMarketplace');
jest.mock('@/hooks/useCurrentSession/useCurrentSession');
const mockMpId = 'test-partner';
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useParams: jest.fn(() => ({ missionPartnerId: mockMpId }))
}));

jest.mock('@cerberus/icons', () => ({
  ...jest.requireActual('@cerberus/icons'),
  UserAvatarFilled: () => <div data-testid="user-avatar-filled-icon" />,
  UserFilled: () => <div data-testid="user-filled-icon" />,
  CaretUp: () => <div data-testid="caret-up-icon" />,
  CaretDown: () => <div data-testid="caret-down-icon" />,
  Logout: () => <div data-testid="logout-icon" />
}));

const mockUser = USE_MARKETPLACE_MOCK_RETURN_VALUE.marketplaceUser.user;
const mockGreetingText = `Hello, ${mockUser.firstName}`;

describe('TopNavUser', () => {
  let mockSignOut;
  let mockRouter;

  beforeEach(() => {
    mockSignOut = jest.fn();
    mockRouter = { push: jest.fn() };
    (useGetSession as jest.Mock).mockReturnValue(
      USE_MARKETPLACE_MOCK_RETURN_VALUE.marketplaceUser
    );
    (useSignOut as jest.Mock).mockReturnValue({
      signOut: mockSignOut
    });
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (useIsDuAdmin as jest.Mock).mockReturnValue({ isDuAdmin: true });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic Render', () => {
    it('displays the user icon and greeting text', () => {
      renderV3(<TopNavUser />);
      expect(screen.getByText(mockGreetingText)).toBeInTheDocument();
      expect(screen.getByTestId('user-filled-icon')).toBeInTheDocument();
      expect(screen.getByTestId('caret-down-icon')).toBeInTheDocument();
      expect(screen.queryByTestId('caret-up-icon')).not.toBeInTheDocument();
    });
  });

  describe('Dropdown Toggle', () => {
    it('shows dropdown when the component is clicked', () => {
      renderV3(<TopNavUser />);
      fireEvent.click(screen.getByText(mockGreetingText));

      expect(screen.getByTestId('caret-up-icon')).toBeInTheDocument();
      expect(screen.queryByTestId('caret-down-icon')).not.toBeInTheDocument();

      expect(screen.getByTestId('user-avatar-filled-icon')).toBeInTheDocument();
      expect(
        screen.getByText(`${mockUser.firstName} ${mockUser.lastName}`)
      ).toBeInTheDocument();
      expect(screen.getByText('Profile & Settings')).toBeInTheDocument();

      expect(screen.getByText('Manage Marketplace')).toBeInTheDocument();
      expect(screen.getByText('Admin Portal')).toBeInTheDocument();
      expect(screen.getByText('Command Center')).toBeInTheDocument();

      expect(screen.getByText('Sign out')).toBeInTheDocument();
      expect(screen.getByTestId('logout-icon')).toBeInTheDocument();
    });

    it('hides dropdown when clicked again', () => {
      renderV3(<TopNavUser />);
      const greetingText = screen.getByText(mockGreetingText);
      fireEvent.click(greetingText);
      expect(screen.queryByText('Profile & Settings')).toBeInTheDocument();

      fireEvent.click(greetingText);
      expect(screen.queryByText('Profile & Settings')).not.toBeInTheDocument();
      expect(screen.getByTestId('caret-down-icon')).toBeInTheDocument();
      expect(screen.queryByTestId('caret-up-icon')).not.toBeInTheDocument();
    });
  });

  describe('Dropdown Links', () => {
    beforeEach(() => {
      renderV3(<TopNavUser />);
      fireEvent.click(screen.getByText(mockGreetingText));
    });

    it('renders "Profile & Settings" link', () => {
      const profileLink = screen.getByText('Profile & Settings');
      expect(profileLink).toBeInTheDocument();
      expect(profileLink).toHaveAttribute('href', '/app/profile');
    });

    it('renders "Manage Marketplace" link', () => {
      const manageMPLink = screen.getByText('Manage Marketplace');
      expect(manageMPLink).toBeInTheDocument();
      expect(manageMPLink).toHaveAttribute(
        'href',
        '/marketplace/mp/test-partner'
      );
    });

    it('renders "Admin Portal" link with correct mission partner ID', () => {
      const adminLink = screen.getByText('Admin Portal');
      expect(adminLink).toBeInTheDocument();
      const anchor = adminLink.closest('a');

      expect(anchor).toHaveAttribute('href', expect.stringContaining(mockMpId));
      expect(anchor).toHaveAttribute(
        'href',
        expect.not.stringContaining('marketplace')
      );
    });

    it('triggers redirect to root on "Command Center" click', () => {
      const commandCenterLink = screen.getByText('Command Center');
      fireEvent.click(commandCenterLink);

      expect(mockRouter.push).toHaveBeenCalledWith(window.location.origin);
    });
  });

  describe('Sign Out Link', () => {
    beforeEach(() => {
      renderV3(<TopNavUser />);
      fireEvent.click(screen.getByText(mockGreetingText));
    });

    it('calls the signOut function when "Sign out" link is clicked', () => {
      const signOutLink = screen.getByText('Sign out');
      fireEvent.click(signOutLink);

      expect(mockSignOut).toHaveBeenCalled();
    });
  });
});
