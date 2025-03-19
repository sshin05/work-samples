import { Button, IconButton } from '@cerberus/react';
import { css } from '@cerberus/styled-system/css';
import { ChevronDown, ChevronUp, Download } from '@cerberus/icons';
import { hstack } from '@cerberus/styled-system/patterns';
import { BadgeCard } from '../BadgeCard';
import type { Badge, MissionPartnerType } from '../mpBadges.types';
import { useState } from 'react';

interface BadgesGridProps {
  badges: Badge[];
  missionPartner: MissionPartnerType;
  handleExportBadges: (
    ownerId: string | undefined,
    missionPartnerId: string | undefined,
    badgeId: string
  ) => void;
  gridType: 'missionPartnerBadgesGrid' | 'digitalUniversityBadgesGrid';
  exportingDisabled?: boolean;
}

export const BadgesGrid = ({
  exportingDisabled,
  badges,
  missionPartner,
  handleExportBadges,
  gridType
}: BadgesGridProps) => {
  const [showAllBadges, setShowAllBadges] = useState(false);
  const toggleShowAllBadges = () => setShowAllBadges(prev => !prev);

  const canToggleViewMore = badges?.length > 6;

  const filteredBadgesCount = badges.length;
  const visibleBadges = badges.slice(0, showAllBadges ? badges?.length : 6);

  const linkLabel =
    canToggleViewMore && showAllBadges ? (
      <>
        <span>Show Less</span> <ChevronUp />
      </>
    ) : (
      <>
        <span>Show More</span> <ChevronDown />
      </>
    );

  return (
    <div className={css({ w: 'full', mb: '3rem' })}>
      <div className={hstack({ mb: 4 })}>
        <h5 className={css({ textStyle: 'h5' })}>
          {filteredBadgesCount}
          {gridType === 'digitalUniversityBadgesGrid'
            ? ' Digital University'
            : ` ${missionPartner?.name}`}
          {filteredBadgesCount === 0 || filteredBadgesCount > 1
            ? ` Badges`
            : ` Badge`}
        </h5>
        <IconButton
          ariaLabel="download all badges button"
          palette="action"
          usage="ghost"
          size="sm"
          onClick={() =>
            handleExportBadges(
              gridType === 'missionPartnerBadgesGrid'
                ? missionPartner.id
                : undefined,
              gridType === 'digitalUniversityBadgesGrid'
                ? missionPartner.id
                : undefined,
              undefined
            )
          }
        >
          <Download size={16} />
        </IconButton>
      </div>
      <div
        className={hstack({
          w: 'full',
          gap: 4,
          flexWrap: 'wrap',
          alignItems: 'stretch',
          boxSizing: 'border-box'
        })}
      >
        {visibleBadges.map(badge => (
          <BadgeCard
            key={badge?.id}
            badge={badge}
            handleExportBadges={handleExportBadges}
            exportingDisabled={exportingDisabled}
            missionPartnerId={missionPartner?.id}
            missionPartnerName={missionPartner?.name}
            missionPartnerCount={badge?.missionPartnerCount}
            gridType={gridType}
          />
        ))}
      </div>
      {canToggleViewMore && (
        <Button
          onClick={toggleShowAllBadges}
          shape="rounded"
          usage="ghost"
          className={css({ display: 'block', mt: '4', mx: 'auto' })}
        >
          <div className={hstack({ fontWeight: 600 })}>{linkLabel}</div>
        </Button>
      )}
    </div>
  );
};
