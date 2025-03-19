'use client';
import { useSearchParams } from 'next/navigation';
import { useRouteParams } from '@/hooks/useRouteParams';
import PlanCourses from '@/page-components/PlanCoursesPage';

const CohortPlanCoursesPage = () => {
  const { missionPartnerId, groupId } = useRouteParams();
  const searchParams = useSearchParams();
  const planType = searchParams.get('planType') || '';
  const planSourceId = searchParams.get('planSourceId') || '';
  const planVersion = searchParams.get('planVersion') || undefined;
  const title = searchParams.get('title') || '';

  return (
    <PlanCourses
      missionPartnerId={missionPartnerId}
      planType={planType}
      planSourceId={planSourceId}
      planVersion={planVersion}
      title={title}
      groupId={groupId}
      sourceToDestinationUrl="CohortPlanCoursesLearners"
    />
  );
};

export default CohortPlanCoursesPage;
