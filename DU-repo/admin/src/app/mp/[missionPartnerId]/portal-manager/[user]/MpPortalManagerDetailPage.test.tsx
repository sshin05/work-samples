import { ApolloProvider } from '@apollo/client';
import { createMockClient } from 'mock-apollo-client';
import { useSession } from 'next-auth/react';
import { renderV3, screen } from '@@/test-utils';
import { useFindMissionPartnerMinDetails } from '@/api/mission-partner';
import PortalManagerUserPage from './page';

jest.mock('@/api/mission-partner');
jest.mock('next-auth/react');
jest.mock('../../learner/[user]/components/MpLearnerPage', () => ({
  MpLearnerPage: jest.fn(() => (
    <div data-testid="mockedLearnerPage">
      <p>
        This Component already has a test, and the page only passes a couple
        props down
      </p>
    </div>
  ))
}));
jest.mock('@/hooks/useRouteParams', () => ({
  useRouteParams: jest.fn(() => ({
    missionPartnerId: '1234',
    user: 'abcde-12345'
  }))
}));

const minDetailsQueryResponse = {
  missionPartnerMinDetails: {
    id: '1',
    affiliateId: 'digita-university',
    name: 'Digital University',
    logoUrl: 'https://example.com/logo.png',
    description: 'Digital University Mission Partner',
    accessCode: '123456789'
  },
  missionPartnerMinDetailsLoading: false
};

const mockSession = {
  expires: '1',
  user: { email: 'foo@bar.com', name: 'foo bar', roles: ['admin'] }
};

describe('MissionPartner - portal manager - manage user', () => {
  let mockClient;
  beforeAll(() => {
    mockClient = createMockClient();
    (useSession as jest.Mock).mockReturnValue({ data: mockSession });

    (useFindMissionPartnerMinDetails as jest.Mock).mockReturnValue({
      missionPartnerMinDetails: minDetailsQueryResponse,
      missionPartnerMinDetailsError: null,
      missionPartnerMinDetailsLoading: false
    });
  });

  // the child component is already tested; this wrapper being tested simply prop-drills
  it('should render', () => {
    renderV3(
      <ApolloProvider client={mockClient}>
        <PortalManagerUserPage />
      </ApolloProvider>
    );
    expect(screen.getByTestId('mockedLearnerPage')).toBeInTheDocument();
  });
});
