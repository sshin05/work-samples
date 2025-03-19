import { PageHeader } from '@/components_new/typography/PageHeader';
import type { PageProps } from '@/app/types';
import { GradeBookTabs } from './components/GradeBookTabs';
import { Box } from '@cerberus/styled-system/jsx';

const GradebookPage = async (props: PageProps) => {
  const missionPartnerId = (await props.params).missionPartnerId;

  return (
    <>
      <PageHeader>Gradebook</PageHeader>
      <Box w="full" marginBlock="2.38rem" minW="39rem">
        <GradeBookTabs missionPartnerId={missionPartnerId} />
      </Box>
    </>
  );
};

export default GradebookPage;
