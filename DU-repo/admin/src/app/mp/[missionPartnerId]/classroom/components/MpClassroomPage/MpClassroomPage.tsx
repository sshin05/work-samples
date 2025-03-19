'use client';
import { useRouteParams } from '@/hooks/useRouteParams';
import MainContentVStack from '@/components_new/layout/MainContentVStack';
import { useSQLQuery } from '@/app/api';
import { css } from '@cerberus/styled-system/css';
import { flex, hstack, vstack } from '@cerberus/styled-system/patterns';
import { sqlFindCohorts } from '@/app/api/cohorts';
import { getRouteUrl, routeGenerators } from '@/utils/getRouteUrl';
import Link from 'next/link';
import { ClassroomBackground } from './components/ClassroomBackground/ClassroomBackground';
import { PageHeader } from '@/components_new/typography/PageHeader';
import { CTAModal, Accordion, AccordionItemGroup } from '@cerberus/react';
import { CreateCohortModal } from './components/CreateCohortModal';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { CohortListCard } from './components/CohortListCard/CohortListCard';
import { sqlGetMissionPartnerById } from '@/app/api/mission-partner';
import { Search } from '@cerberus/icons';
import { useEffect, useState } from 'react';
import type { FindCohortData } from '../../[cohortId]/cohort.types';
import { TextInput } from '@/components_new/form/TextInput/TextInput';
import { PlaceholderCohortListCard } from './components/PlaceholderCohortListCard';

dayjs.extend(isBetween);

export enum CohortStatus {
  IN_PROGRESS = 'In Progress',
  UPCOMING = 'Upcoming',
  DRAFT = 'Draft',
  PAST = 'Past'
}

export const MpClassroomPage = () => {
  const { missionPartnerId } = useRouteParams();
  const { data: cohorts } = useSQLQuery(sqlFindCohorts);

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (cohorts?.records) {
      setIsLoading(false);
    }
  }, [cohorts]);

  const {
    data: missionPartner
    // loading: missionPartnerLoading
    // error: missionPartnerError
  } = useSQLQuery(sqlGetMissionPartnerById, {
    options: {
      id: missionPartnerId
    }
  });
  const now = dayjs();

  const filteredCohorts = cohorts?.records.filter(
    cohort =>
      cohort.cohortStatus.toLowerCase() !== 'internal' &&
      (!searchTerm ||
        cohort.name?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const groupedCohorts = {
    [CohortStatus.IN_PROGRESS]: filteredCohorts
      ?.filter(
        cohort =>
          cohort.cohortStatus.toLowerCase() === 'published' &&
          cohort.meetingStartDate &&
          cohort.meetingEndDate &&
          now.isBetween(
            dayjs(cohort.meetingStartDate),
            dayjs(cohort.meetingEndDate),
            null,
            '[]'
          )
      )
      .sort((a, b) =>
        dayjs(a.meetingEndDate).diff(now) < dayjs(b.meetingEndDate).diff(now)
          ? -1
          : 1
      ),
    [CohortStatus.UPCOMING]: filteredCohorts
      ?.filter(
        cohort =>
          cohort.cohortStatus.toLowerCase() === 'published' &&
          cohort.meetingStartDate &&
          now.isBefore(dayjs(cohort.meetingStartDate))
      )
      .sort((a, b) =>
        dayjs(a.meetingStartDate).diff(now) <
        dayjs(b.meetingStartDate).diff(now)
          ? -1
          : 1
      ),
    [CohortStatus.DRAFT]: filteredCohorts
      ?.filter(cohort => cohort.cohortStatus.toLowerCase() === 'draft')
      .sort((a, b) =>
        dayjs(now).diff(a._createdAt) < dayjs(now).diff(b._createdAt) ? -1 : 1
      ),
    [CohortStatus.PAST]: filteredCohorts
      ?.filter(
        cohort =>
          cohort.cohortStatus.toLowerCase() === 'published' &&
          cohort.meetingEndDate &&
          now.isAfter(dayjs(cohort.meetingEndDate))
      )
      .sort((a, b) =>
        dayjs(now).diff(a.meetingEndDate) < dayjs(now).diff(b.meetingEndDate)
          ? -1
          : 1
      )
  };

  const renderCohorts = (status: CohortStatus) => {
    const cohorts = groupedCohorts[status];

    return (
      <AccordionItemGroup
        aria-busy={isLoading}
        heading={status}
        value={status}
        indicatorPosition="start"
        size="lg"
        key={status + searchTerm}
      >
        <div className={flex({ gap: '4', direction: 'row', wrap: 'wrap' })}>
          {cohorts?.map((cohort: FindCohortData) => {
            const publishedUrl = getRouteUrl(
              routeGenerators.Classroom({
                missionPartnerId,
                cohortId: cohort.id
              })
            );

            const draftUrl = getRouteUrl(
              routeGenerators.CreateCohortById({
                missionPartnerId,
                cohortId: cohort.id
              })
            );

            const url =
              cohort.cohortStatus === 'Published' ? publishedUrl : draftUrl;

            return (
              <Link href={url} key={cohort.id} className={css({ w: 'full' })}>
                <CohortListCard
                  cohort={cohort}
                  missionPartner={missionPartner}
                  status={status}
                />
              </Link>
            );
          })}
        </div>
      </AccordionItemGroup>
    );
  };

  return (
    <MainContentVStack className={css({ w: 'full', maxW: '8xl' })}>
      <ClassroomBackground />
      <div className={hstack({ justifyContent: 'space-between', w: 'full' })}>
        <PageHeader>Cohorts</PageHeader>
        <CTAModal>
          <CreateCohortModal missionPartnerId={missionPartnerId} />
        </CTAModal>
      </div>
      <TextInput
        name="search"
        label="Search"
        placeholder="Search"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className={css({
          maxW: '500px',
          pr: '9',
          textStyle: 'body-sm',
          letterSpacing: '0.32px'
        })}
        startIcon={<Search />}
      />
      {Object.values(groupedCohorts).every(
        cohortArray => Array.isArray(cohortArray) && cohortArray.length === 0
      ) ? (
        <div className={vstack({ pt: '16', pb: '16' })}>
          <PlaceholderCohortListCard
            numTopTags={2}
            numBottomTags={3}
            circularProgressId="cp-1"
          />
          <PlaceholderCohortListCard
            numTopTags={2}
            numBottomTags={2}
            circularProgressId="cp-2"
          />
          <p className={css({ textStyle: 'heading-md' })}>
            There aren&apos;t any Cohorts yet
          </p>
          <p className={css({ textStyle: 'body-sm' })}>
            Create a cohort to assign training and monitor progress of multiple
            students at a time.
          </p>
        </div>
      ) : (
        <div className={flex({ gap: '8', direction: 'column' })}>
          <Accordion
            multiple
            defaultValue={[CohortStatus.IN_PROGRESS, CohortStatus.UPCOMING]}
          >
            {groupedCohorts[CohortStatus.IN_PROGRESS]?.length > 0 &&
              renderCohorts(CohortStatus.IN_PROGRESS)}
            {groupedCohorts[CohortStatus.UPCOMING]?.length > 0 &&
              renderCohorts(CohortStatus.UPCOMING)}
            {groupedCohorts[CohortStatus.DRAFT]?.length > 0 &&
              renderCohorts(CohortStatus.DRAFT)}
            {groupedCohorts[CohortStatus.PAST]?.length > 0 &&
              renderCohorts(CohortStatus.PAST)}
          </Accordion>
        </div>
      )}
    </MainContentVStack>
  );
};
