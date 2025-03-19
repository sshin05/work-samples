import type { PageProps } from '@/app/types';
import { PageHeader } from '@/components_new/typography/PageHeader';
import { Box } from '@cerberus/styled-system/jsx';
import MpCustomTrainingTabs from './components/MpCustomTrainingTabs/MpCustomTrainingTabs';

const CustomTrainingPage = async (props: PageProps) => {
  const missionPartnerId = (await props.params).missionPartnerId;
  const tab = (await props.searchParams).tab || '1';

  return (
    <>
      <PageHeader>Custom Training</PageHeader>
      <Box w="full" marginBlock="2.38rem" minW="39rem">
        <MpCustomTrainingTabs missionPartnerId={missionPartnerId} tab={tab} />
      </Box>
    </>
  );
};

export default CustomTrainingPage;
