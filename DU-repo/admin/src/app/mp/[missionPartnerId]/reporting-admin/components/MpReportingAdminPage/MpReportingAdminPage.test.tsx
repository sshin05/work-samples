import { renderV3, screen } from '@@/test-utils';
import { MpReportingAdminPage } from './MpReportingAdminPage';
import { ApolloProvider } from '@apollo/client';
import { useSession } from 'next-auth/react';
import { createMockClient, type MockApolloClient } from 'mock-apollo-client';

jest.mock('next-auth/react');

let mockClient: MockApolloClient;

const mockSession = {
  expires: '1',
  user: { email: 'foo@bar.com', name: 'foo bar', roles: ['admin'] },
  isDuAdmin: true
};

describe('Reporting Admin page', () => {
  beforeAll(() => {
    mockClient = createMockClient();
    (useSession as jest.Mock).mockReturnValue({ data: mockSession });
  });
  it('should render the component', () => {
    renderV3(
      <ApolloProvider client={mockClient}>
        <MpReportingAdminPage missionPartnerId="mp1" />
      </ApolloProvider>
    );
    expect(screen.getByText('Report availability')).toBeInTheDocument();
    expect(screen.getByText('Available')).toBeInTheDocument();
    expect(screen.getByText('Download')).toBeInTheDocument();
  });
});
