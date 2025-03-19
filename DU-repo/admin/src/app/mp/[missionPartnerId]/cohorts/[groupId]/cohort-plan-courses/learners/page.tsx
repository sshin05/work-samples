'use client';
import { useSearchParams } from 'next/navigation';
import { useRouteParams } from '@/hooks/useRouteParams';
import { CourseMetricsLearners } from '../../../../../../../page-components/CourseMetricsLearners';

const MissionPartnerCohortPlanCoursesLearnersPage = () => {
  const { missionPartnerId } = useRouteParams();
  const searchParams = useSearchParams();
  const planType = searchParams.get('planType') || '';
  const planSourceId = searchParams.get('planSourceId') || '';
  const planVersion = searchParams.get('planVersion') || '';
  const title = searchParams.get('title') || '';
  const vendor = searchParams.get('vendor') || '';
  const status = searchParams.get('status') || '';
  const courseId = searchParams.get('courseId') || '';

  const props = {
    missionPartnerId,
    planType,
    planSourceId,
    planVersion,
    title,
    vendor,
    status,
    courseId
  };

  return (
    <>
      <CourseMetricsLearners {...props} />
    </>
  );
};

export default MissionPartnerCohortPlanCoursesLearnersPage;
