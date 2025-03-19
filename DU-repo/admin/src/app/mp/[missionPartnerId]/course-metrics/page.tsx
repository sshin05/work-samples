import type { PageProps } from '@/app/types';
import { MpCourseMetricsPage } from './components/MpCourseMetricsPage';

const CourseMetricsPage = async (props: PageProps) => {
  const missionPartnerId = (await props.params).missionPartnerId;

  return <MpCourseMetricsPage missionPartnerId={missionPartnerId} />;
};

export default CourseMetricsPage;
