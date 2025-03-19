import { ApolloProvider } from '@apollo/client';
import { createMockClient, type MockApolloClient } from 'mock-apollo-client';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { TopNav } from './TopNav';
import { useRouteParams } from '@/hooks/useRouteParams';
import { renderV3, screen } from '@@/test-utils';

jest.mock('./components/TopNavUser/TopNavUser', () => ({
  TopNavUser: () => <div data-testid="top-nav-user" />
}));

jest.mock('./components/TopNavOrders/TopNavOrders', () => ({
  TopNavOrders: () => <div data-testid="top-nav-orders" />
}));

jest.mock('./components/TopNavCart/TopNavCart', () => ({
  TopNavCart: () => <div data-testid="top-nav-cart" />
}));

jest.mock('./components/SotxLogo/SotxLogo', () => ({
  SotxLogo: () => <div data-testid="sotx-logo" />
}));

jest.mock('next-auth/react');
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
  useParams: jest.fn(() => ({ missionPartnerId: 'test' }))
}));

jest.mock('@/hooks/useRouteParams', () => ({
  useRouteParams: jest.fn()
}));

const mockSession = {
  expires: '1',
  user: { email: 'foo@bar.com', name: 'foo bar', roles: ['admin'] }
};

let mockClient: MockApolloClient;
beforeAll(() => {
  (useSession as jest.Mock).mockReturnValue({
    data: mockSession
  });
  mockClient = createMockClient();
});

const mockMpId = 'test-partner';
describe('TopNav', () => {
  beforeEach(() => {
    (useRouteParams as jest.Mock).mockReturnValue({
      missionPartnerId: mockMpId
    });

    (usePathname as jest.Mock).mockReturnValue('/marketplace');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic Render', () => {
    it('renders TopNav component with default "block" variant (PLP and PDP)', () => {
      renderV3(
        <ApolloProvider client={mockClient}>
          <TopNav />
        </ApolloProvider>
      );

      const navWrapper = screen.getByRole('navigation');
      expect(navWrapper).toBeInTheDocument();

      const logoLink = screen.getByRole('link', { name: /SOT-X/i });
      expect(logoLink).toBeInTheDocument();
      expect(logoLink).toHaveAttribute(
        'href',
        expect.stringContaining(`/marketplace/mp/${mockMpId}`)
      );

      expect(screen.getByTestId('top-nav-user')).toBeInTheDocument();
      expect(screen.getByTestId('top-nav-orders')).toBeInTheDocument();
      expect(screen.getByTestId('top-nav-cart')).toBeInTheDocument();
    });
  });

  describe('Link Selection State', () => {
    it('applies selected styling to the SOT-X link when not on orders page (marketplace/)', () => {
      renderV3(
        <ApolloProvider client={mockClient}>
          <TopNav />
        </ApolloProvider>
      );

      const sotxLink = screen.getByRole('link', { name: /SOT-X/i });
      expect(sotxLink).toHaveAttribute('aria-selected', 'true');
    });

    it('applies selected styling to the SOT-X link when not on orders page (marketplace/categories/fake-id)', () => {
      (usePathname as jest.Mock).mockReturnValueOnce(
        '/marketplace/categories/fake-id'
      );
      renderV3(
        <ApolloProvider client={mockClient}>
          <TopNav />
        </ApolloProvider>
      );

      const sotxLink = screen.getByRole('link', { name: /SOT-X/i });
      expect(sotxLink).toHaveAttribute('aria-selected', 'true');
    });

    it('does not apply selected styling to SOT-X link when on orders page', () => {
      (usePathname as jest.Mock).mockReturnValueOnce('/marketplace/orders');
      renderV3(
        <ApolloProvider client={mockClient}>
          <TopNav />
        </ApolloProvider>
      );

      const sotxLink = screen.getByRole('link', { name: /SOT-X/i });
      expect(sotxLink).toHaveAttribute('aria-selected', 'false');
    });
  });

  describe('Variant Rendering', () => {
    it('renders the temporary SOT-X icon and link for the "block" variant', () => {
      renderV3(
        <ApolloProvider client={mockClient}>
          <TopNav variant="block" />
        </ApolloProvider>
      );

      const tempIcon = screen.getByRole('link', { name: /SOT-X/i });
      expect(tempIcon).toBeInTheDocument();
      expect(tempIcon).toHaveAttribute(
        'href',
        expect.stringContaining(`/marketplace/mp/${mockMpId}`)
      );
    });

    it('renders Admin Portal link with image for the "floating" variant', () => {
      renderV3(
        <ApolloProvider client={mockClient}>
          <TopNav variant="floating" />
        </ApolloProvider>
      );

      const adminLink = screen.getByRole('link', { name: /Admin Portal/i });
      expect(adminLink).toBeInTheDocument();
      expect(adminLink).toHaveAttribute(
        'href',
        expect.stringContaining(`mp/${mockMpId}`)
      );

      const adminLogo = screen.getByRole('img');
      expect(adminLogo).toBeInTheDocument();
      expect(adminLogo).toHaveAttribute(
        'src',
        '/admin/images/digitalu-logo.svg'
      );
    });

    it('renders SotxLogo component in the "floating" variant', () => {
      renderV3(
        <ApolloProvider client={mockClient}>
          <TopNav variant="floating" />
        </ApolloProvider>
      );

      expect(screen.getByTestId('sotx-logo')).toBeInTheDocument();
    });
  });
});
