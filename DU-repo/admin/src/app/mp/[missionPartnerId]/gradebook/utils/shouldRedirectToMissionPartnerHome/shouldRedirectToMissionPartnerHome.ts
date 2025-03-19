import type { ShouldRedirectToMissionPartnerHomeArgs } from './shouldRedirectToMissionPartnerHome.types';

export const shouldRedirectToMissionPartnerHome = ({
  missionPartnerMinDetails,
  isDuAdmin
}: ShouldRedirectToMissionPartnerHomeArgs): boolean =>
  Boolean(missionPartnerMinDetails) &&
  !missionPartnerMinDetails.customTrainingEnabled &&
  !isDuAdmin;
