import type {
  FindLabByIdQuery,
  FindLatestForceMultiplierByIdAdminQuery
} from '@/api/codegen/graphql';

export type UseFilteredCurriculumDataProps = {
  missionPartnerId?: string;
  targetType?: string;
  targetId?: string;
  forceMultiplierById: FindLatestForceMultiplierByIdAdminQuery['findLatestForceMultiplierByIdAdmin'];
  findLabById: FindLabByIdQuery['findLabById'];
};
