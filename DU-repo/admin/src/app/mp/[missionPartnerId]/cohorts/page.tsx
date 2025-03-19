import type { PageProps } from '@/app/types';
import { PageHeader } from '@/components_new/typography/PageHeader';
import { Box } from '@cerberus/styled-system/jsx';
import { MpCohortsPage } from './MpCohortsPage';

const CohortsPage = async (props: PageProps) => {
  const missionPartnerId = (await props.params).missionPartnerId;

  return (
    <>
      <PageHeader>Cohorts</PageHeader>
      <Box w="full" marginBlock="2.38rem" minW="39rem">
        <MpCohortsPage missionPartnerId={missionPartnerId} />
      </Box>
    </>
  );
};

export default CohortsPage;
