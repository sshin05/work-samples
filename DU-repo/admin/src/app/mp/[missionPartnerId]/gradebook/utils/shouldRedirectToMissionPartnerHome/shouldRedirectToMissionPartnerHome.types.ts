import type { MissionPartnerMinDetails } from '@/api/codegen/graphql';

export type ShouldRedirectToMissionPartnerHomeArgs = {
  isDuAdmin: boolean;
  missionPartnerMinDetails: MissionPartnerMinDetails | null | undefined;
};
