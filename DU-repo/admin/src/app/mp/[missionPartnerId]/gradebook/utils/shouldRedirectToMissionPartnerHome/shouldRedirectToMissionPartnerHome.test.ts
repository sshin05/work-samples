import { shouldRedirectToMissionPartnerHome } from '.';
import type { MissionPartnerMinDetails } from '@/api/codegen/graphql';
import type { ShouldRedirectToMissionPartnerHomeArgs } from './shouldRedirectToMissionPartnerHome.types';

describe('shouldRedirectToMissionPartnerHome', () => {
  /** Arguments required to return `true` from function invocation */
  const successData: ShouldRedirectToMissionPartnerHomeArgs = {
    isDuAdmin: false,
    missionPartnerMinDetails: {
      customTrainingEnabled: false
    } as MissionPartnerMinDetails
  };

  it('returns true when custom training is disabled and the user is not a DU Admin', () => {
    expect(shouldRedirectToMissionPartnerHome(successData)).toBe(true);
  });

  it('returns false when the mission partner details are mission', () => {
    const data = {
      ...successData,
      missionPartnerMinDetails: null
    };

    expect(shouldRedirectToMissionPartnerHome(data)).toBe(false);
  });

  it('returns false when custom training is disabled and the user is a DU Admin', () => {
    const data = {
      ...successData,
      isDuAdmin: true
    };

    expect(shouldRedirectToMissionPartnerHome(data)).toBe(false);
  });

  it('returns false when custom training is enabled and the user is not a DU Admin', () => {
    const data = {
      ...successData,
      missionPartnerMinDetails: {
        ...successData.missionPartnerMinDetails,
        customTrainingEnabled: true
      }
    };

    expect(shouldRedirectToMissionPartnerHome(data)).toBe(false);
  });
});
