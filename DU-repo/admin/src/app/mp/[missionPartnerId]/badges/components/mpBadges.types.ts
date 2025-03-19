import type { FindMissionPartnerByIdQuery } from '@/api/codegen/graphql';

interface MissionPartnerBadge {
  id: string;
  title: string;
  count: number;
  imageUrl: string;
  missionPartnerCount?: number;
}

interface DigitalUniversityBadge {
  id: string;
  title: string;
  missionPartnerCount: number;
  imageUrl: string;
}

type Badge = MissionPartnerBadge | DigitalUniversityBadge;

type MissionPartnerType = FindMissionPartnerByIdQuery['findMissionPartnerById'];

/** Type guard for MissionPartnerBadge where count is defined */
const isMissionPartnerBadge = (badge: Badge): badge is MissionPartnerBadge => {
  return (badge as MissionPartnerBadge).count !== undefined;
};

export type {
  Badge,
  DigitalUniversityBadge,
  MissionPartnerBadge,
  MissionPartnerType
};

export { isMissionPartnerBadge };
