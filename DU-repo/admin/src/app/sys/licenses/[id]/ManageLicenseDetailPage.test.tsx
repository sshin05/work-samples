import { ApolloProvider } from '@apollo/client';
import { createMockClient } from 'mock-apollo-client';
import { useFindVendorById } from '@/api/vendor';
import { renderV3, screen } from '@@/test-utils';
import accountJson from '@/api/_mocks/account/account.json';
import ManageLicensePage from './page';

jest.mock('@/api/vendor');

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
  useParams: jest.fn(() => ({ id: 'udemy' }))
}));

describe('Vendor Detail Page', () => {
  let mockClient;

  beforeAll(() => {
    mockClient = createMockClient();

    (useFindVendorById as jest.Mock).mockReturnValue({
      vendorError: undefined,
      vendorLoading: false,
      user: accountJson,
      vendor: {
        id: 'udemy',
        name: 'Udemy',
        provisioned: 5,
        assigned: 2
      }
    });
  });

  it('should render the vendor detail page', () => {
    renderV3(
      <ApolloProvider client={mockClient}>
        <ManageLicensePage />
      </ApolloProvider>
    );

    expect(screen.getByText(/Udemy/)).toBeInTheDocument();
    expect(screen.getByText(/Licenses/)).toBeInTheDocument();
    expect(screen.getByText(/5 provisioned/)).toBeInTheDocument();
    expect(screen.getByText(/2 assigned/)).toBeInTheDocument();
    expect(screen.getByText(/3 available/)).toBeInTheDocument();
  });
});
