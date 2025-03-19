import { hstack } from '@cerberus/styled-system/patterns';
import { MpBadgesPage } from './components/MpBadgesPage';
import type { PageProps } from '@/app/types';
import { PageHeader } from '@/components_new/typography/PageHeader';
import { Box } from '@cerberus/styled-system/jsx';
import BadgesCount from './components/BadgesCount/BadgesCount';

const BadgesPage = async (props: PageProps) => {
  const missionPartnerId = (await props.params).missionPartnerId;

  return (
    <>
      <Box className={hstack({ justifyContent: 'space-between', w: 'full' })}>
        <Box className={hstack({ alignItems: 'flex-end' })}>
          <PageHeader>Badges</PageHeader>
          <BadgesCount missionPartnerId={missionPartnerId} />
        </Box>
      </Box>
      <Box w="full" marginBlock="2.38rem" minW="39rem">
        <MpBadgesPage missionPartnerId={missionPartnerId} />
      </Box>
    </>
  );
};

export default BadgesPage;
