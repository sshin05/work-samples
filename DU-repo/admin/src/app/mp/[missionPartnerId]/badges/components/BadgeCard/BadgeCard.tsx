import { css, cx } from '@cerberus/styled-system/css';
import { Download } from '@cerberus/icons';
import { Button } from '@cerberus/react';
import { hstack, vstack } from '@cerberus/styled-system/patterns';
import { isMissionPartnerBadge, type Badge } from '../mpBadges.types';
import { containerStyles } from '@/app/styles/ContainerStyles';

interface BadgeCardProps {
  badge: Badge;
  exportingDisabled: boolean;
  missionPartnerId: string;
  missionPartnerName: string;
  missionPartnerCount?: number;
  gridType: 'missionPartnerBadgesGrid' | 'digitalUniversityBadgesGrid';
  handleExportBadges: (
    ownerId: string | undefined,
    missionPartnerId: string | undefined,
    badgeId: string
  ) => void;
}
const BadgeCard = (props: BadgeCardProps) => {
  const {
    badge,
    handleExportBadges,
    missionPartnerId,
    missionPartnerName,
    exportingDisabled,
    missionPartnerCount,
    gridType
  } = props;
  const count = isMissionPartnerBadge(badge)
    ? badge.count
    : badge.missionPartnerCount;

  const missionPartnerCountDisplayText =
    count > 0 ? (
      <span>
        <span className={css({ fontWeight: 'bold' })}>{count}</span>{' '}
        {count === 1 ? 'Recipient' : 'Recipients'}
      </span>
    ) : (
      ''
    );
  const countUsersDisplayText = !missionPartnerCount ? null : (
    <span>
      <span className={css({ fontWeight: 'bold' })}>{missionPartnerCount}</span>{' '}
      {missionPartnerName} Member
      {missionPartnerCount > 1 ? 's' : ''}
    </span>
  );

  return (
    <div
      className={cx(
        vstack({
          p: 4,
          flex: {
            base: '1 1 100%',
            lg: '1 1 calc(50% - 12px)'
          },
          flexWrap: {
            base: 'nowrap',
            lg: 'wrap'
          },
          borderRadius: 2,
          minWidth: {
            base: 'auto',
            lg: 0
          },
          maxWidth: {
            base: '100%',
            lg: 'calc(50% - 12px)'
          },
          boxSizing: 'border-box',
          justifyContent: 'space-between'
        }),
        containerStyles
      )}
    >
      <div
        className={hstack({
          w: '100%',
          minWidth: 0,
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignContent: 'center',
          gap: 2
        })}
      >
        <div
          className={hstack({
            flex: {
              base: 'auto',
              xl: 1
            },
            minWidth: 0,
            alignItems: 'center',
            gap: 2
          })}
        >
          <img
            src={badge.imageUrl}
            alt="badge icon"
            className={css({ w: '16', mr: '4' })}
          />
          <div
            className={css({
              w: '100%',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            })}
          >
            <h6
              className={css({
                fontWeight: 'bold',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              })}
            >
              {badge.title}
            </h6>
            <div
              className={hstack({
                pt: '2.5',
                textStyle: 'body-sm',
                gap: 1,
                flexWrap: 'wrap'
              })}
            >
              {gridType === 'missionPartnerBadgesGrid' && (
                <div className={css({ mr: 4 })}>
                  {missionPartnerCountDisplayText}
                </div>
              )}
              <div>{countUsersDisplayText}</div>
            </div>
          </div>
        </div>
        <div
          className={css({
            justifyContent: 'center',
            ml: 'auto'
          })}
        >
          <Button
            aria-label="download this badge button"
            onClick={() =>
              handleExportBadges(
                undefined,
                gridType === 'digitalUniversityBadgesGrid'
                  ? missionPartnerId
                  : undefined,
                badge.id
              )
            }
            shape="rounded"
            usage="ghost"
            disabled={exportingDisabled}
          >
            Download <Download />
          </Button>
        </div>
      </div>
    </div>
  );
};

export { BadgeCard };
