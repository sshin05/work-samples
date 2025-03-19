'use client';
import { useRouteParams } from '@/hooks/useRouteParams';
import PlanCourses from '@/page-components/PlanCoursesPage';
import { useSearchParams } from 'next/navigation';

const PlanCoursesPage = () => {
  const { missionPartnerId } = useRouteParams();
  const searchParams = useSearchParams();
  const groupId = searchParams.get('groupId') || '';
  const planType = searchParams.get('planType');
  const planSourceId = searchParams.get('planSourceId');
  const planVersion = searchParams.get('planVersion') || undefined;
  const title = searchParams.get('title');

  return (
    <PlanCourses
      groupId={groupId}
      missionPartnerId={missionPartnerId}
      planType={planType}
      planSourceId={planSourceId}
      planVersion={planVersion}
      title={title}
      sourceToDestinationUrl="PlanMetricsPlanLearners"
    />
  );
};

export default PlanCoursesPage;
