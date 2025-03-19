'use client';
import { CourseMetricsLearners } from '../../../../../page-components/CourseMetricsLearners';
import { useSearchParams } from 'next/navigation';
import { useRouteParams } from '@/hooks/useRouteParams';

const MissionPartnerCourseMetricsLearnersPage = () => {
  const { missionPartnerId } = useRouteParams();

  const searchParams = useSearchParams();
  const vendor = searchParams.get('vendor');
  const status = searchParams.get('status');
  const courseId = searchParams.get('courseId');

  return (
    <>
      <CourseMetricsLearners
        courseId={courseId}
        missionPartnerId={missionPartnerId}
        vendor={vendor}
        status={status}
        planType={undefined}
        planSourceId={undefined}
      />
    </>
  );
};

export default MissionPartnerCourseMetricsLearnersPage;
