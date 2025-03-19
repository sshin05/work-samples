'use client';

import dynamic from 'next/dynamic';
import { TableLoader } from '@/components_new/loaders/TableLoader';
import { getLoadingColumns } from '@/components_new/loaders/utils/getLoadingColumns';

const columns = getLoadingColumns([
  'Report availability',
  'Available',
  'Download'
]);

const ReportingAdminTable = dynamic(
  () => import('../ReportingAdminTable/ReportingAdminTable'),
  {
    ssr: false,
    loading: () => <TableLoader columns={columns} noButton hasToolbar={false} />
  }
);

export const MpReportingAdminPage = ({ missionPartnerId }) => {
  return (
    <>
      <ReportingAdminTable missionPartnerId={missionPartnerId} />
    </>
  );
};
