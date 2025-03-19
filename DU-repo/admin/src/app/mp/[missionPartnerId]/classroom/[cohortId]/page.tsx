'use client';

import { sqlGetCohort } from '@/app/api/cohorts';
import { sqlGetMissionPartnerById } from '@/app/api/mission-partner';
import { useSQLQuery } from '@/app/api';
import MainContentVStack from '@/components_new/layout/MainContentVStack';
import { useRouteParams } from '@/hooks/useRouteParams';
import { getRouteUrl, routeGenerators } from '@/utils/getRouteUrl';
import { ArrowUpRight } from '@carbon/icons-react';
import { Button } from '@cerberus/react';
import { css } from '@cerberus/styled-system/css';
import { flex, hstack } from '@cerberus/styled-system/patterns';
import { useRouter } from 'next/navigation';
import { ClassroomBackground } from '../components/MpClassroomPage/components/ClassroomBackground/ClassroomBackground';
import { ClassroomDetails } from './components/ClassroomDetails/ClassroomDetails';
import { ClassroomMetaAttributes } from './components/ClassroomMetaAttributes/ClassroomMetaAttributes';
import { ClassroomTable } from './components/ClassroomTable/ClassroomTable';
import { ClassroomTags } from './components/ClassroomTags/ClassroomTags';
import type { CohortData } from './cohort.types';

function getPublicLabel(cohort: CohortData) {
  return cohort?.isPublic ? 'public' : 'private';
}

function getDateStatus(cohort: CohortData): string[] {
  const labels: string[] = [];
  const now = new Date();

  const startDate = parseDate(cohort.meetingStartDate);
  const endDate = parseDate(cohort.meetingEndDate);

  if (startDate && endDate) {
    if (now < startDate) {
      labels.push('upcoming');
    } else if (now >= startDate && now <= endDate) {
      labels.push('live');
    } else if (now > endDate) {
      labels.push('ended');
    }
  } else if (startDate) {
    if (now < startDate) {
      labels.push('upcoming');
    } else {
      labels.push('ended');
    }
  } else {
    labels.push('ended');
  }

  return labels;
}

function parseDate(date: string | Date | null): Date | null {
  if (!date) return null;
  const parsedDate = new Date(date);
  return isNaN(parsedDate.getTime()) ? null : parsedDate;
}

function calculateCohortLabels(cohort: CohortData): string[] {
  const labels = [];
  labels.push(getPublicLabel(cohort));

  if (cohort.cohortStatus === 'Draft') {
    labels.push('draft');
  } else if (cohort.cohortStatus === 'Published') {
    labels.push(...getDateStatus(cohort));
  }

  return labels;
}

const CohortDetails = () => {
  const { missionPartnerId, cohortId } = useRouteParams();
  const router = useRouter();

  /// @TODO(Lyle): How does the route missionPartnerId relate to the cohort mission partner data?
  const {
    data: missionPartner
    // loading: missionPartnerLoading,
    // error: missionPartnerError
  } = useSQLQuery(sqlGetMissionPartnerById, {
    options: {
      id: missionPartnerId
    }
  });

  const {
    data: cohort,
    loading: cohortLoading,
    error: cohortError,
    query: queryCohort
  } = useSQLQuery(sqlGetCohort, {
    options: {
      id: cohortId
    }
  });
  const isInitialLoading = !(cohort || cohortError);

  if (isInitialLoading) {
    // Loading skeleton only on initial page load; spinner on future changes.
    return (
      <MainContentVStack>
        <ClassroomBackground />
      </MainContentVStack>
    );
  }

  if (cohortError || (!cohort && !cohortLoading)) {
    return <MainContentVStack>Failed to load cohort</MainContentVStack>;
  }

  return (
    <div className={css({ maxW: '8xl' })}>
      <ClassroomBackground />
      <div className={flex({ gap: '10', direction: 'column' })}>
        <div className={flex({ direction: 'column', gap: '4' })}>
          <div className={hstack({ justifyContent: 'space-between' })}>
            <ClassroomTags labels={calculateCohortLabels(cohort)} />
            <Button
              onClick={() =>
                router.push(
                  getRouteUrl(
                    routeGenerators.ClassroomPreview({
                      missionPartnerId,
                      cohortId
                    })
                  )
                )
              }
              usage="ghost"
            >
              Preview
              <ArrowUpRight size={16} />
            </Button>
          </div>
          <div
            className={css({
              display: 'inline-flex',
              alignItems: 'center'
            })}
          >
            <h1
              className={css({
                display: 'inline',
                textStyle: 'display-md'
              })}
            >
              {cohort?.name}
            </h1>
          </div>

          <ClassroomMetaAttributes
            missionPartner={missionPartner}
            cohort={cohort}
          />

          <div
            className={css({
              p: '6',
              borderRadius: 'lg',
              opacity: '95%',
              bg: 'white'
            })}
          >
            <span className={css({ textStyle: 'body-md' })}>
              {cohort?.description}
            </span>
          </div>
        </div>

        <div>
          <ClassroomDetails
            cohort={cohort}
            onDetailsUpdate={async () => {
              await queryCohort({
                id: cohortId
              });
            }}
          />
        </div>

        <div>
          <ClassroomTable cohort={cohort} />
        </div>
      </div>
    </div>
  );
};

export default CohortDetails;
