import { MpReportingAdminPage } from './components/MpReportingAdminPage';
import type { PageProps } from '@/app/types';
import { PageHeader } from '@/components_new/typography/PageHeader';
import { Box } from '@cerberus/styled-system/jsx';

const ReportingAdminPage = async (props: PageProps) => {
  const missionPartnerId = (await props.params).missionPartnerId;

  return (
    <>
      <PageHeader>Reporting</PageHeader>
      <Box w="full" marginBlock="2.38rem" minW="39rem">
        <MpReportingAdminPage missionPartnerId={missionPartnerId} />
      </Box>
    </>
  );
};

export default ReportingAdminPage;
