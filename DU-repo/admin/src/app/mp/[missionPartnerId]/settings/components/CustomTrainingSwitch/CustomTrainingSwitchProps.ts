import type { FindMissionPartnerByIdQuery } from '@/api/codegen/graphql';

export type CustomTrainingSwitchProps = {
  missionPartner: FindMissionPartnerByIdQuery['findMissionPartnerById'];
  canUserEdit: boolean;
};
