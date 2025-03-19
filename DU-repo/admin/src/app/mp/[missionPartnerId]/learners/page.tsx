import type { PageProps } from '@/app/types';
import { LearnersTabs } from './components/LearnersTabs';
import { Box } from '@cerberus/styled-system/jsx';
import { PageHeader } from '@/components_new/typography/PageHeader';
import LearnersSubheading from './components/LearnersTabs/LearnersSubheading';

const LearnersPage = async (props: PageProps) => {
  const missionPartnerId = (await props.params).missionPartnerId;

  return (
    <>
      <PageHeader>Learners</PageHeader>
      <LearnersSubheading missionPartnerId={missionPartnerId} />
      <Box w="full" marginBlock="2.38rem" minW="39rem">
        <LearnersTabs
          missionPartnerId={missionPartnerId}
          missionPartherRequestCount={0}
        />
      </Box>
    </>
  );
};

export default LearnersPage;
