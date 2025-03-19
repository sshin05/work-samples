import React from 'react';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@apollo/client';
import { renderV3, screen } from '@@/test-utils';
import { useCountActiveUsersByMissionPartnerId } from '@/api/users';
import { useFindMissionPartnerById } from '@/api/mission-partner';
import {
  useExportBadges,
  useGetAllAwardedBadgesByMissionPartnerMembership,
  useGetMissionPartnerOwnedBadges
} from '@/api/badge';
import { MpBadgesPage } from './MpBadgesPage';

const mockPush = jest.fn();
const mockMpId = 'Mp1';

jest.mock('@/api/users');
jest.mock('@/api/badge');
jest.mock('@/api/mission-partner');

jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useQuery: jest.fn()
}));
jest.mock('next-auth/react', () => ({
  useSession: jest.fn(() => ({
    data: {}
  }))
}));
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: mockPush
  })),
  useParams: jest.fn(() => ({ missionPartnerId: mockMpId })),
  useSearchParams: jest.fn()
}));

describe('<MpBadgesPage />', () => {
  beforeAll(() => {
    (useExportBadges as jest.Mock).mockReturnValue({
      exportBadges: jest.fn(async () => Promise.resolve()),
      exportBadgesLoading: false,
      exportBadgesError: null
    });
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
    (useFindMissionPartnerById as jest.Mock).mockReturnValue({
      useFindMissionPartnerById: jest.fn(),
      missionPartnerLoading: false,
      missionPartnerError: null,
      missionPartner: { id: '1', name: 'Test Partner' }
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
    (useCountActiveUsersByMissionPartnerId as jest.Mock).mockReturnValue({
      countActiveUsers: 4,
      countActiveUsersLoading: false,
      countActiveUsersError: false
    });
    (useQuery as jest.Mock).mockReturnValue({
      loading: false,
      error: null,
      data: null
    });
  });

  afterEach(() => {
    mockPush.mockReset();
  });

  it('should render Badges page', () => {
    renderV3(<MpBadgesPage missionPartnerId={mockMpId} />);

    expect(screen.getByText('Badge 1')).toBeInTheDocument();
  });
});
