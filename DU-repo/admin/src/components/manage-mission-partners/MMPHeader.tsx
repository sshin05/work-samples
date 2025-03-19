import { Text, Flex, typography, Image } from '@digital-u/digital-ui';
import { BaseSkeleton } from '@/components_new/loaders';
import AffiliateLogo from './AffiliateLogo';

interface MMPHeaderProps {
  missionPartnerName: string;
  missionPartnerLogo?: string;
  groupName?: string;
  affiliateId: string;
  page?: string;
  loading: boolean;
}

const MMPHeader = ({
  missionPartnerName,
  missionPartnerLogo,
  groupName,
  affiliateId,
  page,
  loading
}: MMPHeaderProps) => {
  return loading ? (
    <Flex alignItems="center" gap="1rem">
      <BaseSkeleton width={450} height={70} />
    </Flex>
  ) : (
    <Flex gap={typography.sizes[4]} alignItems="center">
      {missionPartnerLogo ? (
        <Image
          src={missionPartnerLogo}
          alt={`${missionPartnerName} logo`}
          variant="avatar"
          style={{
            width: '70px',
            height: '70px'
          }}
        />
      ) : (
        <AffiliateLogo affiliateId={affiliateId} height="70px" width="70px" />
      )}
      <Text size="h2" fontWeight="extraBold">
        {missionPartnerName}
      </Text>
      {groupName && (
        <Text size="h2" fontWeight="extraBold" style={{ color: '#5F00B5' }}>
          {groupName}
        </Text>
      )}
      <Text size="h2" fontWeight="extraBold" style={{ color: '#5F00B5' }}>
        {page}
      </Text>
    </Flex>
  );
};

export default MMPHeader;
