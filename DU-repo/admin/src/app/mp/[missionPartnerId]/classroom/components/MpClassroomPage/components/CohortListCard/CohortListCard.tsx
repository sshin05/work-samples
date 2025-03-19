import { css } from '@cerberus/styled-system/css';
import dayjs from 'dayjs';
import { hstack } from '@cerberus/styled-system/patterns';
import {
  Calendar,
  ChevronRight,
  Events,
  Location,
  User
} from '@carbon/icons-react';
import ImageFetcher from '@/app/marketplace/components/ImageFetcher/ImageFetcher';
import { CircularProgress, Show } from '@cerberus/react';
import { AwsImage } from '@/components_new/images/AwsImage';
import type { FindCohortData } from '../../../../[cohortId]/cohort.types';
import { CohortListCardTags } from './components/CohortListCardTags';
import { useSQLQuery } from '@/app/api';
import { sqlFindCohortMembers } from '@/app/api/cohorts';

export enum CohortStatus {
  IN_PROGRESS = 'In Progress',
  UPCOMING = 'Upcoming',
  DRAFT = 'Draft',
  PAST = 'Past'
}

const ICON_SIZE_PX = 16;

type CohortDetailsProps = {
  cohort: FindCohortData;
  missionPartner: any;
  status: CohortStatus;
};

export const CohortListCard = ({
  cohort,
  missionPartner,
  status
}: CohortDetailsProps) => {
  const {
    id,
    name,
    meetingStartDate,
    meetingEndDate,
    learnersMax,
    location,
    environment,
    isPublic
  } = cohort;

  const { data: members } = useSQLQuery(sqlFindCohortMembers, {
    options: { filter: { cohortId: id } }
  });

  const formattedDate =
    meetingStartDate && meetingEndDate
      ? `${dayjs(meetingStartDate).format('DD MMM').toUpperCase()} to ${dayjs(meetingEndDate).format('DD MMM YYYY').toUpperCase()}`
      : 'TBD';

  //progress calculation for progress indicator
  const now = dayjs();
  const totalTime =
    dayjs(meetingEndDate).diff(dayjs(meetingStartDate).startOf('day'), 'days') +
    1; // Add 1 day to include the start date
  const timeElapsed =
    now.diff(dayjs(meetingStartDate).startOf('day'), 'days') + 1;
  const progress = dayjs(meetingEndDate).isBefore(now)
    ? 100
    : (timeElapsed / totalTime) * 100;

  const isCohortActiveOrComplete =
    status !== CohortStatus.DRAFT && status !== CohortStatus.UPCOMING;

  return (
    <div
      className={hstack({
        gap: '6',
        py: '4',
        px: '10',
        mb: '4',
        w: 'full',
        bg: 'cerberus.neutral.white',
        borderRadius: 'lg'
      })}
    >
      {/* Cohort Status Indicator */}
      <div className={css({ w: '6.25rem' })}>
        <CircularProgress
          bgStyle="filled"
          label="Progress indicator for the class"
          id={id}
          syntax={isCohortActiveOrComplete ? 'Done' : 'Not Started'}
          now={isCohortActiveOrComplete ? Math.floor(progress) : 0}
          title="Class completion"
        />
      </div>
      <div>
        {/* Cohort Name/Status */}
        <CohortListCardTags
          status={status}
          isPublic={isPublic}
          meetingStartDate={meetingStartDate}
          meetingEndDate={meetingEndDate}
        />
        <div className={css({ mb: '2', fontSize: 'lg', fontWeight: 'bold' })}>
          {name}
        </div>

        <div className={hstack({ gap: '4', whiteSpace: 'nowrap' })}>
          {/* Cohort Dates */}
          <div className={hstack({})}>
            <Calendar size={ICON_SIZE_PX} />
            <span className={css({ fontSize: 'sm', fontWeight: 'medium' })}>
              {formattedDate}
            </span>
          </div>

          {/* Cohort Environment */}
          <Show when={Boolean(environment)}>
            <div className={hstack()}>
              <Location size={ICON_SIZE_PX} />
              <span className={css({ fontSize: 'sm', fontWeight: 'medium' })}>
                {environment === 'InPerson' ? 'In Person' : environment}
              </span>
            </div>
          </Show>

          {/* Cohort Location */}
          <Show when={Boolean(location)}>
            <div className={hstack()}>
              <User size={ICON_SIZE_PX} />
              <span className={css({ fontSize: 'sm', fontWeight: 'medium' })}>
                {location}
              </span>
            </div>
          </Show>

          {/* Cohort Seats / Learners */}
          <Show when={learnersMax != null}>
            <div className={hstack()}>
              <Events size={ICON_SIZE_PX} />
              <span className={css({ fontSize: 'sm', fontWeight: 'medium' })}>
                {`${members?.total} Learners added (${learnersMax - members?.total} Seats remaining)`}
              </span>
            </div>
          </Show>

          {/* Mission Partner Logo and Name */}
          <div className={hstack()}>
            <Show
              when={missionPartner?.logoUrl}
              fallback={
                <ImageFetcher
                  src="/admin/images/digitalu-logo.svg"
                  alt={missionPartner?.name || ''}
                  fallbackSrc=""
                  width={ICON_SIZE_PX}
                  height={ICON_SIZE_PX}
                />
              }
            >
              <AwsImage
                src={missionPartner?.logoUrl}
                alt={missionPartner?.name || ''}
              />
            </Show>
            <Show when={Boolean(missionPartner?.name)}>
              <span
                className={css({
                  fontSize: 'sm',
                  fontWeight: 'medium'
                })}
              >
                {missionPartner?.name}
              </span>
            </Show>
          </div>
        </div>
      </div>
      <ChevronRight size={16} className={css({ ml: 'auto' })} />
    </div>
  );
};
