import { ApolloProvider } from '@apollo/client';
import { createMockClient } from 'mock-apollo-client';
import { screen, renderV3 } from '@@/test-utils';
import MissionPartnerSettingsPage from './page';
import {
  useFindMissionPartnerById,
  useUpdateCustomTrainingEnabled
} from '@/api/mission-partner';

const mockUser = {
  id: 2,
  name: 'admin',
  userDate: null,
  userEmail: 'bugs@bunny.com',
  userId: '12345',
  userName: 'Bugs Bunny',
  roles: 'admin'
};

jest.mock('@/api/mission-partner');

jest.mock('next-auth/react', () => ({
  useSession: jest.fn(() => ({ data: { user: mockUser } }))
}));

jest.mock('@/hooks/useRouteParams', () => ({
  useRouteParams: jest.fn(() => ({ missionPartnerId: '1234' }))
}));

jest.mock('./components/PortalManagersTab', () => ({
  PortalManagersTab: () => <div>Portal Managers Tab</div>
}));

jest.mock('./components/MarketplaceSwitch', () => ({
  MarketplaceSwitch: () => <div>Marketplace Switch</div>
}));

jest.mock('./components/MissionPartnerTrial', () => ({
  MissionPartnerTrial: () => <div>Mission Partner Trial</div>
}));

jest.mock('./components/UpdateMissionPartnerDetails', () => ({
  UpdateMissionPartnerDetails: () => <div>Update Mission Partner Details</div>
}));

const mockClient = createMockClient();

describe('MissionPartnerSettingsPage', () => {
  beforeEach(() => {
    (useFindMissionPartnerById as jest.Mock).mockReturnValue({
      missionPartnerLoading: false,
      missionPartner: {},
      missionPartnerError: null
    });
    (useUpdateCustomTrainingEnabled as jest.Mock).mockReturnValue({
      updateCustomTrainingEnabledLoading: false,
      updateCustomTrainingEnabledError: null,
      updateCustomTrainingEnabled: () => {}
    });
  });

  it('should render', () => {
    renderV3(
      <ApolloProvider client={mockClient}>
        <MissionPartnerSettingsPage />
      </ApolloProvider>
    );

    const pageTitle = screen.getByText('Manage Settings');
    expect(pageTitle).toBeInTheDocument();
    const tableTitle = screen.getByText('Portal Managers');
    expect(tableTitle).toBeInTheDocument();
    const missionPartnerTrial = screen.getByText('Mission Partner Trial');
    expect(missionPartnerTrial).toBeInTheDocument();
    const marketplaceSwitch = screen.getByText('Marketplace Switch');
    expect(marketplaceSwitch).toBeInTheDocument();
    const portalManagersTab = screen.getByText('Portal Managers Tab');
    expect(portalManagersTab).toBeInTheDocument();
    const updateMissionPartnerDetails = screen.getByText(
      'Update Mission Partner Details'
    );
    expect(updateMissionPartnerDetails).toBeInTheDocument();
  });
});
