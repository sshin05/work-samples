import { useState } from 'react';
import { isEmpty } from 'lodash';
import { useNotificationCenter } from '@cerberus/react';
import {
  useExportBadges,
  useGetAllAwardedBadgesByMissionPartnerMembership,
  useGetMissionPartnerOwnedBadges
} from '@/api/badge';
import { useFindMissionPartnerById } from '@/api/mission-partner';
import { css } from '@cerberus/styled-system/css';
import { BadgesGrid } from '../BadgesGrid';

interface BadgesSectionProps {
  missionPartnerId: string;
}

const BadgesSection = ({ missionPartnerId }: BadgesSectionProps) => {
  const [exportingDisabled, setExportingDisabled] = useState(false);
  const { notify } = useNotificationCenter();

  const { missionPartner } = useFindMissionPartnerById(missionPartnerId);

  const { getMissionPartnerOwnedBadgesData: missionPartnerBadges } =
    useGetMissionPartnerOwnedBadges(missionPartnerId);

  const {
    getAllAwardedBadgesByMissionPartnerMembershipData: digitalUniversityBadges
  } = useGetAllAwardedBadgesByMissionPartnerMembership(missionPartnerId);
  const { exportBadges } = useExportBadges();

  const handleExportBadges = (
    ownerId: string | undefined,
    missionPartnerId: string | undefined,
    badgeId: string
  ) => {
    if (exportingDisabled) return;

    setExportingDisabled(true);
    exportBadges(ownerId, missionPartnerId, badgeId)
      .then(() =>
        notify({
          palette: 'success',
          heading: 'Success',
          description: `The export has been started. You will receive an email when it is ready.`
        })
      )
      .catch(() =>
        notify({
          palette: 'danger',
          heading: 'Error',
          description: 'There was an error exporting badges.'
        })
      )
      .finally(() => setExportingDisabled(false));
  };

  const filterEmptyBadges = badges =>
    badges?.filter(
      badge =>
        badge.missionPartnerCount !== null && badge.missionPartnerCount > 0
    );

  if (isEmpty(missionPartnerBadges) && isEmpty(digitalUniversityBadges)) {
    return (
      <div
        className={css({ width: 'full', textAlign: 'center' })}
        role="region"
        aria-label="empty badges container"
      >
        <p className={css({ textStyle: 'body-md' })}>0 Badges</p>
        <p
          className={css({
            marginTop: '2',
            textStyle: 'body-md'
          })}
        >
          Once your learners start earning badges, they will appear here.
        </p>
      </div>
    );
  }

  return (
    <div role="region" aria-label="badges grid container">
      {!isEmpty(missionPartnerBadges) && (
        <BadgesGrid
          badges={missionPartnerBadges}
          missionPartner={missionPartner}
          handleExportBadges={handleExportBadges}
          gridType="missionPartnerBadgesGrid"
        />
      )}
      {!isEmpty(digitalUniversityBadges) && (
        <BadgesGrid
          badges={filterEmptyBadges(digitalUniversityBadges)}
          missionPartner={missionPartner}
          handleExportBadges={handleExportBadges}
          gridType="digitalUniversityBadgesGrid"
        />
      )}
    </div>
  );
};

export default BadgesSection;
