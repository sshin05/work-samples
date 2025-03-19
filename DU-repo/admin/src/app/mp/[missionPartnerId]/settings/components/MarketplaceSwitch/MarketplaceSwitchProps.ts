import type { FindMissionPartnerByIdQuery } from '@/api/codegen/graphql';

export type MarketplaceSwitchProps = {
  missionPartner: FindMissionPartnerByIdQuery['findMissionPartnerById'];
  canUserEdit: boolean;
};
