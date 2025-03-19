import { renderV3 as render, screen, waitFor } from '@@/test-utils';
import { useParams, usePathname } from 'next/navigation';
import { useFindMissionPartnerById } from '@/api/mission-partner/useFindMissionPartnerById';
import { useFindOpenForMissionPartner } from '@/api/mission-partner-requests/useFindOpenForMissionPartner';
import { useFindOpenLicenseRequests } from '@/api/license-requests/useFindOpenLicenseRequests';
import { getRouteUrl, routeGenerators } from '@/utils/getRouteUrl';
import { SideNavMpPrimaryLinks } from '../SideNavMpPrimaryLinks';
import { useIsDuAdmin } from '@/hooks/useCurrentSession/useCurrentSession';
import { useFindSettingById } from '@/api/setting';

jest.mock('next/navigation', () => ({
  useParams: jest.fn(),
  usePathname: jest.fn()
}));

jest.mock('@/api/mission-partner/useFindMissionPartnerById', () => ({
  useFindMissionPartnerById: jest.fn()
}));

jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useQuery: jest.fn().mockReturnValue({
    loading: false,
    error: null,
    data: null,
    refetch: jest.fn()
  })
}));

jest.mock('@/api/mission-partner-requests/useFindOpenForMissionPartner');
jest.mock('@/api/license-requests/useFindOpenLicenseRequests');
jest.mock('@/api/setting/useFindSettingById', () => ({
  useFindSettingById: jest.fn()
}));

jest.mock('@/utils/getRouteUrl', () => ({
  getRouteUrl: jest.fn(),
  routeGenerators: {
    MissionPartnerDashboard: jest.fn(),
    MissionPartnerLearners: jest.fn(),
    MissionPartnerVendors: jest.fn(),
    MissionPartnerTrainingHub: jest.fn(),
    Cohorts: jest.fn(),
    CustomTraining: jest.fn(),
    GradeBook: jest.fn(),
    MissionPartnerBadges: jest.fn(),
    ReportingAdmin: jest.fn(),
    MissionPartnerSettings: jest.fn(),
    Curriculum: jest.fn()
  }
}));

jest.mock('@/hooks/useCurrentSession/useCurrentSession', () => ({
  useIsDuAdmin: jest.fn()
}));

const mockRequests = {
  total: 2,
  data: [
    {
      id: '1',
      name: 'Request 1'
    },
    {
      id: '2',
      name: 'Request 2'
    }
  ]
};

describe('SideNavMpPrimaryLinks', () => {
  beforeEach(() => {
    (usePathname as jest.Mock).mockReturnValue('missionPartnerId=1');
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
    (useFindOpenLicenseRequests as jest.Mock).mockReturnValue({
      requests: mockRequests
    });
    (useFindSettingById as jest.Mock).mockReturnValue({
      setting: {
        enabled: false
      }
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the links correctly based on mission partner ID', async () => {
    const mockMissionPartnerId = '12345';
    const mockMissionPartner = { customTrainingEnabled: false };
    (useParams as jest.Mock).mockReturnValue({
      missionPartnerId: mockMissionPartnerId
    });
    (useFindMissionPartnerById as jest.Mock).mockReturnValue({
      missionPartner: mockMissionPartner
    });
    (getRouteUrl as jest.Mock).mockReturnValue('http://example.com');
    (useIsDuAdmin as jest.Mock).mockReturnValue({ isDuAdmin: false });

    render(<SideNavMpPrimaryLinks />);

    await waitFor(() => {
      expect(screen.getByText('Dashboard')).toBeInTheDocument();
      expect(screen.getByText('Learners')).toBeInTheDocument();
      expect(screen.getByText('Licenses')).toBeInTheDocument();
      expect(screen.getByText('Training Hub')).toBeInTheDocument();
      expect(screen.getByText('Cohorts')).toBeInTheDocument();
      expect(screen.getByText('Gradebook')).toBeInTheDocument();
      expect(screen.getByText('Badges')).toBeInTheDocument();
      expect(screen.getByText('Reporting')).toBeInTheDocument();
      expect(screen.getByText('Settings')).toBeInTheDocument();
    });
  });

  it('renders "Custom Training" link if customTrainingEnabled is true', async () => {
    const mockMissionPartnerId = '12345';
    const mockMissionPartner = { customTrainingEnabled: true };

    (useParams as jest.Mock).mockReturnValue({
      missionPartnerId: mockMissionPartnerId
    });
    (useFindMissionPartnerById as jest.Mock).mockReturnValue({
      missionPartner: mockMissionPartner
    });
    (useIsDuAdmin as jest.Mock).mockReturnValue({ isDuAdmin: false });

    render(<SideNavMpPrimaryLinks />);

    await waitFor(() => {
      expect(screen.getByText('Custom Training')).toBeInTheDocument();
    });
  });

  it('does not render "Custom Training" link if customTrainingEnabled is false', async () => {
    const mockMissionPartnerId = '12345';
    const mockMissionPartner = { customTrainingEnabled: false };

    (useParams as jest.Mock).mockReturnValue({
      missionPartnerId: mockMissionPartnerId
    });
    (useFindMissionPartnerById as jest.Mock).mockReturnValue({
      missionPartner: mockMissionPartner
    });
    (useIsDuAdmin as jest.Mock).mockReturnValue({ isDuAdmin: false });

    render(<SideNavMpPrimaryLinks />);

    await waitFor(() => {
      expect(screen.queryByText('Custom Training')).not.toBeInTheDocument();
    });
  });

  it('renders "Custom Training" link if isDuAdmin is true and curriculum setting is true', async () => {
    const mockMissionPartnerId = '12345';
    const mockMissionPartner = { customTrainingEnabled: false };
    (useParams as jest.Mock).mockReturnValue({
      missionPartnerId: mockMissionPartnerId
    });
    (useFindMissionPartnerById as jest.Mock).mockReturnValue({
      missionPartner: mockMissionPartner
    });
    (useIsDuAdmin as jest.Mock).mockReturnValue({ isDuAdmin: true });
    (useFindSettingById as jest.Mock)
      .mockReturnValueOnce({
        setting: {
          id: '1',
          name: 'manage-training',
          value: 'true'
        }
      })
      .mockReturnValueOnce({
        setting: {
          id: '2',
          name: 'curriculum',
          value: 'true'
        }
      });

    render(<SideNavMpPrimaryLinks />);

    await waitFor(() => {
      expect(screen.getByText('Custom Training')).toBeInTheDocument();
      expect(getRouteUrl).toHaveBeenCalledWith(
        routeGenerators.Curriculum({
          missionPartnerId: mockMissionPartnerId
        })
      );
    });
  });

  it('calls getRouteUrl and routeGenerators with correct parameters', async () => {
    const mockMissionPartnerId = '12345';
    const mockMissionPartner = { customTrainingEnabled: false };

    (useParams as jest.Mock).mockReturnValue({
      missionPartnerId: mockMissionPartnerId
    });
    (useFindMissionPartnerById as jest.Mock).mockReturnValue({
      missionPartner: mockMissionPartner
    });

    render(<SideNavMpPrimaryLinks />);

    await waitFor(() => {
      expect(getRouteUrl).toHaveBeenCalledWith(
        routeGenerators.MissionPartnerDashboard({
          missionPartnerId: mockMissionPartnerId
        })
      );
      expect(getRouteUrl).toHaveBeenCalledWith(
        routeGenerators.MissionPartnerLearners({
          missionPartnerId: mockMissionPartnerId
        })
      );
      expect(getRouteUrl).toHaveBeenCalledWith(
        routeGenerators.MissionPartnerVendors({
          missionPartnerId: mockMissionPartnerId
        })
      );
      expect(getRouteUrl).toHaveBeenCalledWith(
        routeGenerators.MissionPartnerTrainingHub({
          missionPartnerId: mockMissionPartnerId
        })
      );
      expect(getRouteUrl).toHaveBeenCalledWith(
        routeGenerators.Cohorts({ missionPartnerId: mockMissionPartnerId })
      );
      expect(getRouteUrl).toHaveBeenCalledWith(
        routeGenerators.GradeBook({ missionPartnerId: mockMissionPartnerId })
      );
      expect(getRouteUrl).toHaveBeenCalledWith(
        routeGenerators.MissionPartnerBadges({
          missionPartnerId: mockMissionPartnerId
        })
      );
      expect(getRouteUrl).toHaveBeenCalledWith(
        routeGenerators.ReportingAdmin({
          missionPartnerId: mockMissionPartnerId
        })
      );
      expect(getRouteUrl).toHaveBeenCalledWith(
        routeGenerators.MissionPartnerSettings({
          missionPartnerId: mockMissionPartnerId
        })
      );
    });
  });
});
