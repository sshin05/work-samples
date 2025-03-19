import type { FindMissionPartnerByIdQuery } from '@/api/codegen/graphql';

export interface CustomPlansTabProps {
  missionPartner: FindMissionPartnerByIdQuery['findMissionPartnerById'];
  tab: string;
  loading: boolean;
  pageLoading: boolean;
}
