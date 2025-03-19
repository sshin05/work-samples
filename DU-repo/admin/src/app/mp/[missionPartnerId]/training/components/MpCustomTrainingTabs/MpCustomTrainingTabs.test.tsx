import { useParams, useSearchParams } from 'next/navigation';
import { renderV3, screen, waitFor } from '@@/test-utils';
import MpCustomTrainingTabs from './MpCustomTrainingTabs';
import { useFindMissionPartnerById } from '@/api/mission-partner';

import {
  APP_VERSION_PATH_PREFIX,
  MP_SLUG
} from '@/utils/getRouteUrl/routeConstants';
import { useIsDuAdmin } from '@/hooks/useCurrentSession/useCurrentSession';

jest.mock('../CustomPlansTab/CustomPlansTab', () => {
  const MockCustomPlansTab = () => <div data-testid="mock-custom-plans-tab" />;
  MockCustomPlansTab.displayName = 'MockCustomPlansTab';
  return MockCustomPlansTab;
});

jest.mock('../CustomTrainingTab/CustomTrainingTab', () => {
  const MockCustomTrainingTab = () => (
    <div data-testid="mock-custom-training-tab" />
  );
  MockCustomTrainingTab.displayName = 'MockCustomTrainingTab';
  return MockCustomTrainingTab;
});

const mockPush = jest.fn();
jest.mock('next-auth/react');
jest.mock('@/api/mission-partner', () => ({
  useFindMissionPartnerById: jest.fn().mockReturnValue({
    missionPartner: { id: '1', name: 'Test Partner' }
  })
}));
jest.mock('@/hooks/useCurrentSession/useCurrentSession');
jest.mock('../CustomTrainingTab/CustomTrainingTab', () => {
  return {
    CustomTrainingTab: () => <div>Mock CustomTrainingTab</div>
  };
});

jest.mock('next/navigation', () => ({
  useParams: jest.fn(),
  useSearchParams: jest.fn(),
  useRouter: jest.fn(() => ({
    push: mockPush
  }))
}));

jest.mock('../AddCustomTrainingItemModalContent', () => ({
  AddCustomTrainingItemModalContent: () => (
    <div>AddCustomTrainingItemModalContent</div>
  )
}));

jest.mock('../AddPlanModalContent', () => ({
  AddPlanModalContent: () => <div>AddPlanModalContent</div>
}));

describe('MissionPartnerCustomTrainingPage', () => {
  const mockUseFindMissionPartnerById = useFindMissionPartnerById as jest.Mock;

  beforeEach(() => {
    (useParams as jest.Mock).mockReturnValue({ missionPartnerId: '1' });
    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn(params => {
        if (params === 'tab') {
          return 'Plans';
        }
        return params;
      })
    });
    (useIsDuAdmin as jest.Mock).mockReturnValue({ isDuAdmin: true });
    (useFindMissionPartnerById as jest.Mock).mockReturnValue({
      missionPartnerLoading: false,
      refetchMissionPartner: jest.fn(),
      missionPartner: {
        scorms: [],
        courses: [],
        exams: [],
        surveys: [],
        labs: []
      }
    });
  });

  it('should render the component with Plans tab initially', () => {
    renderV3(<MpCustomTrainingTabs missionPartnerId="1" tab="1" />);

    expect(screen.getByText('Plans')).toBeInTheDocument();
    expect(screen.getByText('Items')).toBeInTheDocument();
    expect(screen.getByTestId('mock-custom-plans-tab')).toBeInTheDocument();
  });

  it('should redirect if custom training is not enabled and user is not admin', async () => {
    mockUseFindMissionPartnerById.mockReturnValue({
      missionPartnerLoading: false,
      refetchMissionPartner: jest.fn(),
      missionPartner: {
        scorms: [],
        courses: [],
        exams: [],
        surveys: [],
        labs: [],
        customTrainingEnabled: false
      }
    });
    (useIsDuAdmin as jest.Mock).mockReturnValue({ isDuAdmin: false });

    renderV3(<MpCustomTrainingTabs missionPartnerId="1" tab="1" />);
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith(
        `${APP_VERSION_PATH_PREFIX}/${MP_SLUG}/1/dashboard`
      );
    });
  });
});
