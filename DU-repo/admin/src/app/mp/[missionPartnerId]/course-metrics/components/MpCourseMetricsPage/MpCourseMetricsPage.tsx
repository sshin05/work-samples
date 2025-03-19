'use client';
import dynamic from 'next/dynamic';
import { vstack } from '@cerberus/styled-system/patterns';
import { useFindMissionPartnerMinDetails } from '@/api/mission-partner';
import { useGraphqlErrorHandler } from '@/hooks/useGraphqlErrorHandler';
import ContentArea from '@/components_new/layout/ContentArea';
import { TableLoader } from '@/components_new/loaders/TableLoader';
import { getLoadingColumns } from '@/components_new/loaders/utils/getLoadingColumns';
import { PageHeaderLoader } from '@/components_new/loaders/PageHeaderLoader';
import { BackArrowButton } from '@/components_new/buttons/BackArrowButton';

const titles = [
  'Course',
  'Vendor',
  'Total',
  'Started',
  'Pending',
  'Stopped',
  'Completed',
  'Marked completed'
];
const columns = getLoadingColumns(titles);

const CourseMetricsPageHeader = dynamic(
  () => import('./components/CourseMetricsPageHeader'),
  {
    ssr: false,
    loading: () => <PageHeaderLoader name="Courses" />
  }
);

const CourseMetricsTable = dynamic(
  () => import('../CourseMetricsTable/CourseMetricsTable'),
  {
    ssr: false,
    loading: () => <TableLoader columns={columns} noButton />
  }
);

export const MpCourseMetricsPage = props => {
  const { missionPartnerId } = props;
  const { missionPartnerMinDetailsError, missionPartnerMinDetails } =
    useFindMissionPartnerMinDetails(missionPartnerId);

  useGraphqlErrorHandler(missionPartnerMinDetailsError);

  if (!missionPartnerId) return null;

  return (
    <div className={vstack({ gap: 10, alignItems: 'start' })}>
      <div className={vstack({ gap: 4, alignItems: 'start' })}>
        <BackArrowButton />
        <CourseMetricsPageHeader name={missionPartnerMinDetails?.name} />
      </div>
      <ContentArea>
        <CourseMetricsTable
          missionPartnerId={missionPartnerId}
          missionPartnerName={missionPartnerMinDetails?.name}
        />
      </ContentArea>
    </div>
  );
};
