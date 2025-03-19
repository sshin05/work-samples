'use client';

import {
  useGetAllAwardedBadgesByMissionPartnerMembership,
  useGetMissionPartnerOwnedBadges
} from '@/api/badge';
import { Text } from '@cerberus/react';
import { css } from '@cerberus/styled-system/css';

const BadgesCount = ({ missionPartnerId }) => {
  const { getMissionPartnerOwnedBadgesData: missionPartnerBadges } =
    useGetMissionPartnerOwnedBadges(missionPartnerId);

  const {
    getAllAwardedBadgesByMissionPartnerMembershipData: digitalUniversityBadges
  } = useGetAllAwardedBadgesByMissionPartnerMembership(missionPartnerId);

  const filterEmptyBadges = badges =>
    badges?.filter(
      badge =>
        badge.missionPartnerCount !== null && badge.missionPartnerCount > 0
    );
  const totalBadgesCount =
    (missionPartnerBadges?.length ?? 0) +
    (filterEmptyBadges(digitalUniversityBadges)?.length ?? 0);

  const badgesCountLabel = (
    <div className={css({ textStyle: 'label-md', pb: 1.5, pl: 1 })}>
      <span>
        {totalBadgesCount} Badge
        {(totalBadgesCount === 0 || totalBadgesCount > 1) && 's'}
      </span>
    </div>
  );

  return <Text as="p">{badgesCountLabel}</Text>;
};

export default BadgesCount;
