import React from 'react';
import { renderV3, screen } from '@@/test-utils';
import {
  useFindMissionPartnerById,
  useUpdateMissionPartner,
  useRemoveFeaturedTrainingItems
} from '@/api/mission-partner';
import { MpTrainingHubPage } from './MpTrainingHubPage';
import { useIsDuAdmin } from '@/hooks/useCurrentSession/useCurrentSession';

const missionPartnerId = '1234';

jest.mock('@/api/mission-partner');
jest.mock('@/hooks/useCurrentSession/useCurrentSession', () => ({
  useIsDuAdmin: jest.fn()
}));
jest.mock('@/hooks/useRouteParams', () => ({
  useRouteParams: jest.fn(() => ({ missionPartnerId: missionPartnerId }))
}));

jest.mock('../FeaturedTrainingTab/FeaturedTrainingTab', () => {
  const FeatureTrainingTab = () => (
    <div data-testid="mock-featured-training-tab"></div>
  );
  FeatureTrainingTab.displayName = 'FeaturedTrainingTab';
  return FeatureTrainingTab;
});

jest.mock(
  '../UpdateDescriptionAndAccessCode/UpdateDescriptionAndAccessCode',
  () => {
    const UpdateDescriptionAndAccessCode = () => (
      <div data-testid="mock-description-code"></div>
    );
    UpdateDescriptionAndAccessCode.displayName =
      'UpdateDescriptionAndAccessCode';
    return UpdateDescriptionAndAccessCode;
  }
);

jest.mock('../AdminImage/AdminImage', () => {
  const AdminImage = () => <div data-testid="mock-admin-image"></div>;
  AdminImage.displayName = 'AdminImage';
  return AdminImage;
});

describe('MissionPartnerTrainingHubPage', () => {
  beforeEach(() => {
    (useIsDuAdmin as jest.Mock).mockReturnValue({ isDuAdmin: true });
    (useFindMissionPartnerById as jest.Mock).mockReturnValue({
      missionPartner: {},
      missionPartnerLoading: false,
      refetchMissionPartner: jest.fn(),
      missionPartnerError: null
    });
    (useUpdateMissionPartner as jest.Mock).mockReturnValue({
      updateMissionPartner: jest.fn(),
      updateMissionPartnerLoading: false
    });
    (useRemoveFeaturedTrainingItems as jest.Mock).mockReturnValue({
      removeFeaturedTrainingItems: jest.fn()
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render with all 3 dynamic imports', () => {
    renderV3(<MpTrainingHubPage missionPartnerId={missionPartnerId} />);

    expect(screen.getByText('Featured training')).toBeInTheDocument();
    expect(screen.getByTestId('mock-description-code')).toBeInTheDocument();
    expect(screen.getByTestId('mock-admin-image')).toBeInTheDocument();
    expect(
      screen.getByTestId('mock-featured-training-tab')
    ).toBeInTheDocument();
  });
});
