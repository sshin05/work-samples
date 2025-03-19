import { renderV3, screen } from '@@/test-utils';
import { usePathname } from 'next/navigation';
import { SideNavSysPrimaryLinks } from './SideNavSysPrimaryLinks';
import { getRouteUrl, routeGenerators } from '@/utils/getRouteUrl';

jest.mock('next/navigation');

jest.mock('@/utils/getRouteUrl', () => ({
  getRouteUrl: jest.fn(),
  routeGenerators: {
    SysHome: jest.fn(),
    SysLicenses: jest.fn(),
    SysSettings: jest.fn(),
    SysServices: jest.fn(),
    SysDCWF: jest.fn(),
    SysManualItems: jest.fn()
  }
}));

const mockNotify = jest.fn();
jest.mock('@cerberus/react', () => {
  const actual = jest.requireActual('@cerberus/react');
  return {
    ...actual,
    useModal: jest.fn(() => ({
      modalRef: { current: null },
      show: jest.fn(),
      close: jest.fn(),
      isOpen: true
    })),
    useNotificationCenter: jest.fn(() => ({
      notify: mockNotify
    })),
    NotificationCenter: ({ children }) => <div>{children}</div>
  };
});

const mockRouteGenerators = () => {
  (routeGenerators.SysHome as jest.Mock).mockReturnValue('SysHome');
  (routeGenerators.SysLicenses as jest.Mock).mockReturnValue('SysLicenses');
  (routeGenerators.SysSettings as jest.Mock).mockReturnValue('SysSettings');
  (routeGenerators.SysServices as jest.Mock).mockReturnValue('SysServices');
  (routeGenerators.SysDCWF as jest.Mock).mockReturnValue('SysDCWF');
  (routeGenerators.SysManualItems as jest.Mock).mockReturnValue(
    'SysManualItems'
  );
};

const mockGetRouteUrl = () => {
  (getRouteUrl as jest.Mock).mockImplementation(route => {
    switch (route) {
      case 'SysHome':
        return '/sys';
      case 'SysLicenses':
        return '/sys/licenses';
      case 'SysSettings':
        return '/sys/settings';
      case 'SysServices':
        return '/sys/services';
      case 'SysDCWF':
        return '/sys/dcwf';
      case 'SysManualItems':
        return '/sys/manual-items';
      default:
        return '';
    }
  });
};

describe('SideNavSysPrimaryLinks', () => {
  beforeEach(() => {
    (usePathname as jest.Mock).mockReturnValue('/sys/with/many/parts');
    mockRouteGenerators();
    mockGetRouteUrl();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders all the links with correct labels and icons', () => {
    renderV3(<SideNavSysPrimaryLinks />);

    const links = [
      { label: 'Overview', icon: 'Dashboard', href: '/sys' },
      { label: 'Licenses', icon: 'Password', href: '/sys/licenses' },
      { label: 'Global Settings', icon: 'Settings', href: '/sys/settings' },
      { label: 'DCWF', icon: 'Notebook', href: '/sys/dcwf' },
      { label: 'Services', icon: 'ContainerServices', href: '/sys/services' },
      {
        label: 'Manual Items',
        icon: 'WatsonHealth3DCurveManual',
        href: '/sys/manual-items'
      }
    ];

    links.forEach(({ label, href }) => {
      expect(screen.getByText(label)).toBeInTheDocument();
      const linkElement = screen.getByText(label).closest('a');
      expect(linkElement).toBeInTheDocument();
      expect(linkElement).toHaveAttribute('href', href);
    });
  });
});
