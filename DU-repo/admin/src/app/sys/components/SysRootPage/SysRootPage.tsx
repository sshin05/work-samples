'use client';
import { css } from '@cerberus/styled-system/css';
import { useCountAllUsers, useCountNewUsers, useGetUser } from '@/api/user';
import { useCountAllVendors } from '@/api/vendor';
import { useGetTranscriptCourseMetrics } from '@/api/sys/useGetTranscriptCourseMetrics';
import { useGetTrainingPlanMetrics } from '@/api/sys/useGetTrainingPlanMetrics';
import { useCountAllCourses } from '@/api/sys/useCountAllCourses';
import { useGetNewTranscriptCourseMetrics } from '@/api/sys/useGetNewTranscriptCourseMetrics';
import { useGetNewTrainingPlanMetrics } from '@/api/sys/useGetNewTrainingPlanMetrics';
import { useGetTranscriptAssessmentMetrics } from '@/api/sys/useGetTranscriptAssessmentMetrics';
import ContentArea from '@/components_new/layout/ContentArea';
import MainContentVStack from '@/components_new/layout/MainContentVStack';
import { PageHeader } from '@/components_new/typography/PageHeader';
import { DashboardTile } from '../DashboardTile';

const DAY_RANGE = 7;

export const SysRootPage = () => {
  const { user } = useGetUser();
  const BRANCH = user?.branch;
  const { countUsers, countUsersLoading } = useCountAllUsers(BRANCH);
  const { countNewUsers, countNewUsersLoading } = useCountNewUsers(
    BRANCH,
    DAY_RANGE
  );
  const { countVendors, countVendorsLoading } = useCountAllVendors();
  const { transcriptCourseMetrics, transcriptCourseMetricsLoading } =
    useGetTranscriptCourseMetrics(BRANCH);
  const { trainingPlanMetrics, trainingPlanMetricsLoading } =
    useGetTrainingPlanMetrics();
  const { countAllCourses, countAllCoursesLoading } = useCountAllCourses();
  const {
    transcriptCourseMetrics: newTranscriptCourseMetrics,
    transcriptCourseMetricsLoading: newTranscriptCourseMetricsLoading
  } = useGetNewTranscriptCourseMetrics(BRANCH, DAY_RANGE);
  const { transcriptAssessmentMetrics, transcriptAssessmentMetricsLoading } =
    useGetTranscriptAssessmentMetrics();
  const sevenDaysAgo = new Date(
    Date.UTC(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate() - DAY_RANGE
    )
  ).toISOString();
  const {
    transcriptAssessmentMetrics: recentTranscriptAssessmentMetrics,
    transcriptAssessmentMetricsLoading: recentTranscriptAssessmentMetricsLoading
  } = useGetTranscriptAssessmentMetrics(sevenDaysAgo);
  const totalTrainingHours = Math.round(
    transcriptCourseMetrics?.totalHoursCompleted || 0
  );
  const last7DaysTrainingHours = Math.round(
    newTranscriptCourseMetrics?.totalHoursCompleted || 0
  );
  const {
    trainingPlanMetrics: newTrainingPlanMetrics,
    trainingPlanMetricsLoading: newTrainingPlanMetricsLoading
  } = useGetNewTrainingPlanMetrics(BRANCH, DAY_RANGE);

  const gridStyles = css({
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '1.5rem',
    rowGap: '2rem',
    w: 'full'
  });

  return (
    <MainContentVStack>
      <PageHeader>Overview</PageHeader>
      <ContentArea className={gridStyles}>
        <DashboardTile
          headingTitle="Total users"
          headingValue={countUsers}
          countTextWithPlaceholder="{} joined in the last 7 days"
          count={countNewUsers}
          headingLoading={countUsersLoading}
          countLoading={countNewUsersLoading}
        />
        <DashboardTile
          headingTitle="Courses in progress"
          headingValue={transcriptCourseMetrics?.coursesInProgress}
          countTextWithPlaceholder="{} started in the last 7 days"
          count={newTranscriptCourseMetrics?.coursesInProgress}
          headingLoading={transcriptCourseMetricsLoading}
          countLoading={newTranscriptCourseMetricsLoading}
        />
        <DashboardTile
          headingTitle="Hours of training"
          headingValue={totalTrainingHours}
          countTextWithPlaceholder="{} completed in the last 7 days"
          count={last7DaysTrainingHours}
          headingLoading={transcriptCourseMetricsLoading}
          countLoading={newTranscriptCourseMetricsLoading}
        />
        <DashboardTile
          headingTitle="Courses completed"
          headingValue={transcriptCourseMetrics?.coursesCompleted}
          countTextWithPlaceholder="{} completed in the last 7 days"
          count={newTranscriptCourseMetrics?.coursesCompleted}
          headingLoading={transcriptCourseMetricsLoading}
          countLoading={newTranscriptCourseMetricsLoading}
        />
        <DashboardTile
          headingTitle="Plans in progress"
          headingValue={trainingPlanMetrics?.plansInProgress}
          countTextWithPlaceholder="{} started in the last 7 Days"
          count={newTrainingPlanMetrics?.plansInProgress}
          headingLoading={trainingPlanMetricsLoading}
          countLoading={newTrainingPlanMetricsLoading}
        />
        <DashboardTile
          headingTitle="Plans completed"
          headingValue={trainingPlanMetrics?.plansCompleted}
          countTextWithPlaceholder="{} completed in the last 7 Days"
          count={newTrainingPlanMetrics?.plansCompleted}
          headingLoading={trainingPlanMetricsLoading}
          countLoading={newTrainingPlanMetricsLoading}
        />
        <DashboardTile
          headingTitle="Available courses"
          headingValue={countAllCourses}
          countTextWithPlaceholder="Across {} vendors"
          count={countVendors}
          headingLoading={countAllCoursesLoading}
          countLoading={countVendorsLoading}
        />
        <DashboardTile
          headingTitle="Assessments completed"
          headingValue={transcriptAssessmentMetrics?.completed}
          countTextWithPlaceholder="{} completed in the last 7 days"
          count={recentTranscriptAssessmentMetrics?.completed}
          headingLoading={transcriptAssessmentMetricsLoading}
          countLoading={recentTranscriptAssessmentMetricsLoading}
        />
      </ContentArea>
    </MainContentVStack>
  );
};
