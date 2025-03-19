import React from 'react';
import type { FindMissionPartnerByIdQuery } from '@/api/codegen/graphql';
import { fireEvent, renderV3, screen, waitFor } from '@@/test-utils';
import { useSearchParams } from 'next/navigation';
import BadgesSection from './BadgesSection';
import {
  useExportBadges,
  useGetAllAwardedBadgesByMissionPartnerMembership,
  useGetMissionPartnerOwnedBadges
} from '@/api/badge';
import { useFindMissionPartnerById } from '@/api/mission-partner';

const mockHandleExportBadges = jest.fn(async () => Promise.resolve());
const mockPush = jest.fn();

jest.mock('@/api/badge');
jest.mock('@/api/mission-partner');

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: mockPush
  })),
  useParams: jest.fn(() => ({ missionPartnerId: 'test' })),
  useSearchParams: jest.fn()
}));

const mockMissionPartner = {
  id: '1',
  name: 'Test Mission Partner'
} as FindMissionPartnerByIdQuery['findMissionPartnerById'];

describe('BadgesSection', () => {
  beforeAll(() => {
    (useExportBadges as jest.Mock).mockReturnValue({
      exportBadges: mockHandleExportBadges,
      exportBadgesLoading: false,
      exportBadgesError: null
    });
    (
      useGetAllAwardedBadgesByMissionPartnerMembership as jest.Mock
    ).mockReturnValue({
      getAllAwardedBadgesByMissionPartnerMembershipLoading: false,
      getAllAwardedBadgesByMissionPartnerMembershipError: null,
      getAllAwardedBadgesByMissionPartnerMembershipData: [
        {
          id: '2',
          title: 'DU Badge 1',
          missionPartnerCount: 4,
          imageUrl: 'test-4.png'
        }
      ]
    });
    (useGetMissionPartnerOwnedBadges as jest.Mock).mockReturnValue({
      getMissionPartnerOwnedBadgesLoading: false,
      getMissionPartnerOwnedBadgesError: null,
      getMissionPartnerOwnedBadgesData: [
        {
          id: '1',
          title: 'Badge 1',
          count: 3,
          imageUrl: 'test-3.png',
          missionPartnerCount: 6
        }
      ]
    });
    (useFindMissionPartnerById as jest.Mock).mockReturnValue({
      useFindMissionPartnerById: jest.fn(),
      missionPartnerLoading: false,
      missionPartnerError: null,
      missionPartner: mockMissionPartner
    });
    (useSearchParams as jest.Mock).mockReturnValue({
      get: (param: string) => {
        switch (param) {
          case 'showAllDUBadges':
            return 'true';
          case 'showAllMPBadges':
            return 'true';
          default:
            return null;
        }
      }
    });
  });

  afterEach(() => {
    mockPush.mockReset();
  });

  it('renders both BadgesGrid components when both badge arrays are not empty', () => {
    renderV3(<BadgesSection missionPartnerId={mockMissionPartner.id} />);

    expect(screen.getByText('Badge 1')).toBeInTheDocument();
    expect(screen.getByText('DU Badge 1')).toBeInTheDocument();
  });

  it('renders BadgesGrid for digitalUniversityBadges when it is not empty', () => {
    (useGetMissionPartnerOwnedBadges as jest.Mock).mockReturnValue({
      getMissionPartnerOwnedBadgesLoading: false,
      getMissionPartnerOwnedBadgesError: null,
      getMissionPartnerOwnedBadgesData: []
    });
    renderV3(<BadgesSection missionPartnerId={mockMissionPartner.id} />);

    expect(screen.getByText('DU Badge 1')).toBeInTheDocument();
  });

  it('renders BadgesGrid for missionPartnerBadges when it is not empty', () => {
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
      getMissionPartnerOwnedBadgesData: [
        {
          id: '1',
          title: 'Badge 1',
          count: 3,
          imageUrl: 'test-3.png',
          missionPartnerCount: 6
        }
      ]
    });
    renderV3(<BadgesSection missionPartnerId={mockMissionPartner.id} />);

    expect(screen.getByText('Badge 1')).toBeInTheDocument();
  });

  it('renders "0 Badges" message when both badge arrays are empty', () => {
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
    renderV3(<BadgesSection missionPartnerId={mockMissionPartner.id} />);

    expect(screen.getByText('0 Badges')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Once your learners start earning badges, they will appear here.'
      )
    ).toBeInTheDocument();
  });

  it('calls handleExportBadges and shows success notification on click', async () => {
    (useGetMissionPartnerOwnedBadges as jest.Mock).mockReturnValue({
      getMissionPartnerOwnedBadgesLoading: false,
      getMissionPartnerBadgesError: null,
      getMissionPartnerOwnedBadgesData: [
        { id: 'badge1', missionPartnerCount: 4 }
      ]
    });
    (useExportBadges as jest.Mock).mockReturnValue({
      exportBadges: mockHandleExportBadges,
      exportBadgesLoading: false,
      exportBadgesError: null
    });
    renderV3(<BadgesSection missionPartnerId={mockMissionPartner.id} />);
    const exportButton = screen.getAllByLabelText('download this badge button');
    expect(exportButton[0]).toBeInTheDocument();

    fireEvent.click(exportButton[0]);

    await waitFor(() => {
      expect(mockHandleExportBadges).toHaveBeenCalled();
      expect(
        screen.getByText(
          'The export has been started. You will receive an email when it is ready.'
        )
      ).toBeInTheDocument();
    });
  });
});
