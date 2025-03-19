import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { useSession } from 'next-auth/react';
import { createMockClient, type MockApolloClient } from 'mock-apollo-client';
import { renderV3, screen } from '@@/test-utils';
import MissionPartnerMarketplace from './page';

jest.mock(
  '@/app/marketplace/components/MarketplaceClientWrapper/MarketplaceClientWrapper',
  () => ({
    MarketplaceClientWrapper: () => <div data-testid="client-wrapper" />
  })
);

const mockPush = jest.fn();

jest.mock('next-auth/react');
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: mockPush
  })),
  useParams: jest.fn(() => ({ missionPartnerId: 'test' }))
}));

const mockMissionPartnerMinDetails = jest.fn();

jest.mock('@/api/mission-partner', () => ({
  useFindMissionPartnerMinDetails: jest.fn(() => ({
    missionPartnerMinDetails: mockMissionPartnerMinDetails,
    missionPartnerMinDetailsLoading: false
  }))
}));

const mockSession = {
  expires: '1',
  user: { email: 'foo@bar.com', name: 'foo bar', roles: ['admin'] }
};

let _mockClient: MockApolloClient;
beforeAll(() => {
  (useSession as jest.Mock).mockReturnValue(mockSession);
  _mockClient = createMockClient();
});

describe('<MissionPartnerMarketplace />', () => {
  describe('Basic Render', () => {
    it('renders the MarketplaceClientWrapper components', () => {
      renderV3(
        <ApolloProvider client={_mockClient}>
          <MissionPartnerMarketplace />
        </ApolloProvider>
      );

      expect(screen.getByTestId('client-wrapper')).toBeInTheDocument();
    });
  });

  /// @TODO(Lyle): Find out how page access works; are the tests below accurate?

  // it('should render when mission partner has marketplace enabled', () => {
  //   mockMissionPartnerMinDetails.mockReturnValue({
  //     isMarketplaceEnabled: true
  //   });
  //   renderV3(
  //     <ApolloProvider client={mockClient}>
  //       <MissionPartnerMarketplace />
  //     </ApolloProvider>
  //   );
  //   expect(screen.queryAllByText('Marketplace')[0]).toBeInTheDocument();
  // });

  // it('should redirect when mission partner does not have marketplace enabled and user is not an admin', () => {
  //   mockMissionPartnerMinDetails.mockReturnValue({
  //     isMarketplaceEnabled: false
  //   });

  //   (useSession as jest.Mock).mockReturnValue({
  //     data: {
  //       ...mockSession,
  //       user: { email: 'foo@bar.com', name: 'foo bar', roles: [] }
  //     }
  //   });

  //   renderV3(
  //     <ApolloProvider client={mockClient}>
  //       <MissionPartnerMarketplace />
  //     </ApolloProvider>
  //   );
  //   expect(mockPush).toHaveBeenCalledWith(
  //     getRouteUrl(routeGenerators.MissionPartner({ missionPartnerId: 'test' }))
  //   );
  // });
});
