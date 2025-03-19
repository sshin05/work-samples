import {
  useGetAllAwardedBadgesByMissionPartnerMembership,
  useGetMissionPartnerOwnedBadges
} from '@/api/badge';
import BadgesCount from './BadgesCount';
import { renderV3, screen } from '@@/test-utils';

jest.mock('@/api/badge');

jest.mock('@cerberus/react', () => ({
  ...jest.requireActual('@cerberus/react'),
  Text: ({ children }) => <div>{children}</div>
}));

const mockMpId = 'Mp1';

describe('<BadgesCount />', () => {
  beforeAll(() => {
    (
      useGetAllAwardedBadgesByMissionPartnerMembership as jest.Mock
    ).mockReturnValue({
      getAllAwardedBadgesByMissionPartnerMembershipLoading: false,
      getAllAwardedBadgesByMissionPartnerMembershipError: null,
      getAllAwardedBadgesByMissionPartnerMembershipData: []
    });
    (useGetMissionPartnerOwnedBadges as jest.Mock).mockReturnValue({
      getMissionPartnerOwnedBadgesLoading: false,
      getMissionPartnerOwnedBadgesError: null,
      getMissionPartnerOwnedBadgesData: []
    });
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('renders "0 Badges" message when there are no badges', () => {
    renderV3(<BadgesCount missionPartnerId={mockMpId} />);

    expect(screen.getAllByText('0 Badges')[0]).toBeInTheDocument();
  });

  it('renders "1 Badge" message when there is exactly one badge', () => {
    (useGetMissionPartnerOwnedBadges as jest.Mock).mockReturnValue({
      getMissionPartnerOwnedBadgesLoading: false,
      getMissionPartnerBadgesError: null,
      getMissionPartnerOwnedBadgesData: [
        { id: 'badge1', missionPartnerCount: 3 }
      ]
    });
    renderV3(<BadgesCount missionPartnerId={mockMpId} />);
    expect(screen.getByText('1 Badge')).toBeInTheDocument();
  });

  it('renders "1 Badge" message when there is exactly one badge', () => {
    (useGetMissionPartnerOwnedBadges as jest.Mock).mockReturnValue({
      getMissionPartnerOwnedBadgesLoading: false,
      getMissionPartnerBadgesError: null,
      getMissionPartnerOwnedBadgesData: [
        { id: 'badge1', missionPartnerCount: 3 }
      ]
    });
    renderV3(<BadgesCount missionPartnerId={mockMpId} />);
    expect(screen.getByText('1 Badge')).toBeInTheDocument();
  });

  it('it renders "2 Badges" message when there are multiple badges', () => {
    (useGetMissionPartnerOwnedBadges as jest.Mock).mockReturnValue({
      getMissionPartnerOwnedBadgesLoading: false,
      getMissionPartnerBadgesError: null,
      getMissionPartnerOwnedBadgesData: [
        { id: 'badge1', missionPartnerCount: 4 },
        { id: 'badge2', missionPartnerCount: 3 }
      ]
    });
    renderV3(<BadgesCount missionPartnerId={mockMpId} />);
    expect(screen.getByText('2 Badges')).toBeInTheDocument();
  });
});
