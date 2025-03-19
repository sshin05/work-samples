'use client';
import { useSearchParams } from 'next/navigation';
import { CourseMetricsLearners } from '../../../../../../page-components/CourseMetricsLearners';
import { useRouteParams } from '@/hooks/useRouteParams';

const PlanLearners = () => {
  const { missionPartnerId } = useRouteParams();
  const searchParams = useSearchParams();
  const planType = searchParams.get('planType') || '';
  const planSourceId = searchParams.get('planSourceId') || '';
  const courseId = searchParams.get('courseId') || '';
  const status = searchParams.get('status') || '';
  const vendor = searchParams.get('vendor') || '';

  return (
    <>
      <CourseMetricsLearners
        missionPartnerId={missionPartnerId}
        planType={planType}
        planSourceId={planSourceId}
        courseId={courseId}
        status={status}
        vendor={vendor}
      />
    </>
  );
};

export default PlanLearners;
