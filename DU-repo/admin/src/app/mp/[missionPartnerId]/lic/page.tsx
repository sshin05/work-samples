import type { PageProps } from '@/app/types';
import { Box } from '@cerberus/styled-system/jsx';
import LicensesTabs from './LicensesTabs/LicensesTabs';

const MissionPartnerVendorsPage = async (props: PageProps) => {
  const missionPartnerId = (await props.params).missionPartnerId;

  return (
    <Box w="full" marginBlock="2.38rem" minW="39rem">
      <LicensesTabs missionPartnerId={missionPartnerId} />
    </Box>
  );
};

export default MissionPartnerVendorsPage;
