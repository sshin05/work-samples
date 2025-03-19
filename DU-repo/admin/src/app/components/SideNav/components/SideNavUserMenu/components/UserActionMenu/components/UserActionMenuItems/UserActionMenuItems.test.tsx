import { fireEvent, renderV3, screen, waitFor } from '@@/test-utils';
import { UserActionMenuItems } from './UserActionMenuItems';
import {
  useIsDuAdmin,
  useSignOut
} from '@/hooks/useCurrentSession/useCurrentSession';
import { routeGenerators } from '@/utils/getRouteUrl';
import { usePathname } from 'next/navigation';

jest.mock('@/hooks/useCurrentSession/useCurrentSession', () => ({
  useSignOut: jest.fn(),
  useIsDuAdmin: jest.fn()
}));

jest.mock('@cerberus/react', () => ({
  ...jest.requireActual('@cerberus/react'),
  MenuItem: ({ children }) => <div>{children}</div>,
  NotificationCenter: ({ children }) => <div>{children}</div>
}));

jest.mock('next/navigation', () => ({
  usePathname: jest.fn()
}));

describe('UserActionMenuItems', () => {
  const signOutMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useSignOut as jest.Mock).mockReturnValue({ signOut: signOutMock });
    (useIsDuAdmin as jest.Mock).mockReturnValue({ isDuAdmin: true });
    (usePathname as jest.Mock).mockReturnValue('/');
  });

  describe('rendering', () => {
    it('renders menu items when missionPartnerId is present', () => {
      renderV3(<UserActionMenuItems />);

      const reportCenterLink = screen.getByText('Report Center');
      expect(reportCenterLink).toBeInTheDocument();
      expect(reportCenterLink).toHaveAttribute('href', '/report-center');

      const studentPortalLink = screen.getByText('Student Portal');
      expect(studentPortalLink).toBeInTheDocument();

      const logoutLink = screen.getByText('Logout');
      expect(logoutLink).toBeInTheDocument();
    });

    it('renders System Portal and Vendor Portal links when isDuAdmin is true', () => {
      renderV3(<UserActionMenuItems />);

      const systemPortalLink = screen.getByText('System Portal');
      expect(systemPortalLink).toBeInTheDocument();
      expect(systemPortalLink).toHaveAttribute('href', '/sys');

      const vendorPortalLink = screen.getByText('Vendor Portal');
      //expect(vendorPortalLink).toHaveAttribute('href', '/'); TODO: add this in when vendor portal link is available
      expect(vendorPortalLink).toBeInTheDocument();
    });

    it('does not render System Portal and Vendor Portal links when isDuAdmin is false', () => {
      (useIsDuAdmin as jest.Mock).mockReturnValue({ isDuAdmin: false });

      renderV3(<UserActionMenuItems />);

      const systemPortalLink = screen.queryByText('System Portal');
      expect(systemPortalLink).not.toBeInTheDocument();

      const vendorPortalLink = screen.queryByText('Vendor Portal');
      expect(vendorPortalLink).not.toBeInTheDocument();
    });

    it('renders Admin Portal link when path is System Portal', () => {
      (usePathname as jest.Mock).mockReturnValue('/sys');

      renderV3(<UserActionMenuItems />);

      const adminPortalLink = screen.getByText('Admin Portal');
      expect(adminPortalLink).toBeInTheDocument();
      expect(adminPortalLink).toHaveAttribute('href', '/');
    });
  });

  describe('functionality', () => {
    it('handles Logout action', () => {
      renderV3(<UserActionMenuItems />);

      const logoutLink = screen.getByText('Logout');
      fireEvent.click(logoutLink);

      expect(signOutMock).toHaveBeenCalled();
    });

    it('navigates to the Student Portal when clicked', () => {
      renderV3(<UserActionMenuItems />);

      const studentPortalLink = screen.getByText('Student Portal');
      fireEvent.click(studentPortalLink);

      waitFor(() => {
        expect(window.location.href).toBe('http://localhost/');
      });
    });

    it('navigates to the System Portal when clicked', () => {
      renderV3(<UserActionMenuItems />);

      const systemPortalLink = screen.getByText('System Portal');
      fireEvent.click(systemPortalLink);

      waitFor(() => {
        expect(window.location.href).toBe(
          `http://localhost/admin${routeGenerators.SysHome()}`
        );
      });
    });

    it('navigates to the Vendor Portal when clicked', () => {
      renderV3(<UserActionMenuItems />);

      const vendorPortalLink = screen.getByText('Vendor Portal');
      fireEvent.click(vendorPortalLink);

      waitFor(() => {
        expect(window.location.href).toBe('http://localhost/'); //TODO: change to vendor portal link when available
      });
    });

    it('navigates to the Report Center when clicked', () => {
      renderV3(<UserActionMenuItems />);

      const reportCenterLink = screen.getByText('Report Center');
      fireEvent.click(reportCenterLink);

      waitFor(() => {
        expect(window.location.href).toBe(
          `http://localhost/admin${routeGenerators.ReportCenter()}`
        );
      });
    });
  });
});
