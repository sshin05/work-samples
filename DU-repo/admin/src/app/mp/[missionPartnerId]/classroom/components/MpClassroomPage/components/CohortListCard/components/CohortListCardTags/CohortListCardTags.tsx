import { Tag } from '@cerberus/react';
import { css } from '@cerberus/styled-system/css';
import { CohortStatus } from '../../CohortListCard';
import { hstack } from '@cerberus/styled-system/patterns';
import { EarthFilled, Locked } from '@carbon/icons-react';
import dayjs from 'dayjs';

interface CohortListCardTagsProps {
  status: CohortStatus;
  isPublic: boolean;
  meetingStartDate: string;
  meetingEndDate: string;
}

export const CohortListCardTags = ({
  status,
  isPublic,
  meetingStartDate,
  meetingEndDate
}: CohortListCardTagsProps) => {
  const statusGradientMap: Record<CohortStatus, string> = {
    [CohortStatus.IN_PROGRESS]: 'thanatos-light',
    [CohortStatus.UPCOMING]: 'amphiaraus-light',
    [CohortStatus.DRAFT]: 'nyx-light',
    [CohortStatus.PAST]: 'charon-dark'
  };

  const now = dayjs();
  const numDaysLeft = dayjs(meetingEndDate).diff(
    now.subtract(1, 'day'), //subtract 1 day to include the final day as part of days left.
    'days'
  );
  const numDaysUntilStart = dayjs(dayjs(meetingStartDate)).diff(
    now.subtract(1, 'day'),
    'days'
  );

  const statusTagValueMap: Record<CohortStatus, string> = {
    [CohortStatus.IN_PROGRESS]: `Ends in ${numDaysLeft} days`,
    [CohortStatus.PAST]: 'Complete',
    [CohortStatus.DRAFT]: CohortStatus.DRAFT,
    [CohortStatus.UPCOMING]: `Starts in ${numDaysUntilStart} days`
  };

  const gradient = statusGradientMap[status];

  return (
    <div className={hstack()}>
      <Tag
        usage="outlined"
        shape="square"
        gradient="nyx-dark"
        className={css({ mb: '2' })}
      >
        {isPublic ? (
          <>
            <EarthFilled /> Public
          </>
        ) : (
          <>
            <Locked /> Private
          </>
        )}
      </Tag>
      <Tag
        usage="filled"
        shape="square"
        gradient={gradient as never}
        className={css({ mb: '2' })}
      >
        {statusTagValueMap[status]}
      </Tag>
    </div>
  );
};
