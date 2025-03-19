import { ApolloProvider } from '@apollo/client';
import { createMockClient } from 'mock-apollo-client';
import { useRouter } from 'next/navigation';
import { NotificationCenter } from '@cerberus/react';
import { fireEvent, renderV3, screen, userEvent } from '@@/test-utils';
import { ViewMissionPartnerRequestModal } from './components/ViewMissionPartnerRequestsModal';
import { useFindOpenForMissionPartner } from '@/api/mission-partner-requests';
import MissionPartnerRequestsTab from './MissionPartnerRequestsTab';
import { getRouteUrl, routeGenerators } from '@/utils/getRouteUrl';

jest.mock('@/api/mission-partner-requests');
jest.mock('./components/ViewMissionPartnerRequestsModal');

jest.mock('next/navigation', () => ({
  useRouter: jest.fn()
}));
const mockClient = createMockClient();

beforeAll(() => {
  (useFindOpenForMissionPartner as jest.Mock).mockReturnValue({
    findOpenForMissionPartner: jest.fn(),
    findOpenForMissionPartnerData: [
      {
        missionPartnerId: '1',
        missionPartnerName: 'Air Force 1',
        userId: '12345',
        userFirstName: 'first',
        userLastName: 'last',
        userEmail: 'email',
        status: 'Open',
        requestedAt: new Date('01-02-2023'),
        approvedAt: null,
        declinedAt: null
      }
    ]
  });
  jest.mock('./components/ViewMissionPartnerRequestsModal', () => ({
    __esModule: true,
    default: jest.fn().mockReturnValue(<div>View Request Modal</div>)
  }));
});

const missionPartner = {
  id: '1234',
  name: 'MP Name'
};

describe('<MissionPartnerRequestsTab />', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush
    });
  });

  it('should render', async () => {
    renderV3(
      <NotificationCenter>
        <ApolloProvider client={mockClient}>
          <MissionPartnerRequestsTab
            missionPartnerId={missionPartner.id}
            missionPartnerName={missionPartner.name}
            loading={false}
          />
        </ApolloProvider>
      </NotificationCenter>
    );

    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Type')).toBeInTheDocument();
    expect(screen.getByText('Date')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();

    expect(screen.getByText('first last')).toBeInTheDocument();
    expect(screen.getByText('Mission Partner Request')).toBeInTheDocument();
    expect(screen.getByText('02 Jan 2023')).toBeInTheDocument();
    expect(screen.getByText('View request')).toBeInTheDocument();
  });

  it('should call mockPush when name is clicked', async () => {
    renderV3(
      <NotificationCenter>
        <ApolloProvider client={mockClient}>
          <MissionPartnerRequestsTab
            missionPartnerId={missionPartner.id}
            missionPartnerName={missionPartner.name}
            loading={false}
          />
        </ApolloProvider>
      </NotificationCenter>
    );

    const nameLink = screen.getByText('first last');

    expect(nameLink).toBeInTheDocument();

    userEvent.click(nameLink);

    expect(mockPush).toHaveBeenCalledWith(
      getRouteUrl(
        routeGenerators.MissionPartnerLearner({
          missionPartnerId: '1',
          userId: '12345'
        }),
        {
          missionPartnerId: '1',
          crumbNames: '["MissionPartners","MissionPartner"]',
          crumbParameters:
            '{"missionPartnerId":"1","missionPartnerName":"MP Name"}',
          userId: '12345'
        }
      )
    );
  });

  it('should open ViewMissionPartnerRequestModal when View Request is clicked', async () => {
    renderV3(
      <NotificationCenter>
        <ApolloProvider client={mockClient}>
          <MissionPartnerRequestsTab
            missionPartnerId={missionPartner.id}
            missionPartnerName={missionPartner.name}
            loading={false}
          />
        </ApolloProvider>
      </NotificationCenter>
    );

    const viewRequestLink = screen.getByText('View request');

    expect(viewRequestLink).toBeInTheDocument();

    fireEvent.click(viewRequestLink);

    expect(ViewMissionPartnerRequestModal).toHaveBeenCalled();
  });
});
