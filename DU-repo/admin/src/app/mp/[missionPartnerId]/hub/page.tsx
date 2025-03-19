import { PageHeader } from '@/components_new/typography/PageHeader';
import { MpTrainingHubPage } from './components/MpTrainingHubPage';
import { vstack } from '@cerberus/styled-system/patterns';
import { css } from '@cerberus/styled-system/css';
import { Box } from '@cerberus/styled-system/jsx';
import type { PageProps } from '@/app/types';

const TrainingHubPage = async (props: PageProps) => {
  const missionPartnerId = (await props.params).missionPartnerId;

  return (
    <Box w="full">
      <div className={vstack({ gap: 2, alignItems: 'flex-start' })}>
        <PageHeader>Training Hub</PageHeader>
        <p>
          Your training hub is used by members of your organization to join your
          program, find its featured training items and explore cohorts. Add a
          description and at least one featured training item in the fields
          below to enable this page for learners.
        </p>
      </div>
      <div className={vstack({ gap: 8, alignItems: 'flex-start' })}>
        <h2
          className={css({
            textStyle: 'heading-md',
            pt: 16
          })}
        >
          Training Details
        </h2>
        <MpTrainingHubPage missionPartnerId={missionPartnerId} />
      </div>
    </Box>
  );
};

export default TrainingHubPage;
