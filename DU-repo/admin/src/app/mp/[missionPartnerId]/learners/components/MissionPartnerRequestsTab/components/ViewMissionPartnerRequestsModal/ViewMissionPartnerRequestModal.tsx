import { Button, Flex, Text, spacing } from '@digital-u/digital-ui';
import styled from '@emotion/styled';
import { useRouter } from 'next/navigation';
import {
  useFindMissionPartnerRequestById,
  useApproveMissionPartnerRequest,
  useDeclineMissionPartnerRequest
} from '@/api/mission-partner-requests';
import { abbreviatedDayDate } from '@/utils/date/abbreviatedDayDate';
import { getRouteUrl, routeGenerators } from '@/utils/getRouteUrl';
import { InlineLoading } from '@/components_new/deprecated/InlineLoading';
import { CustomModal } from '@/components_new/modals/CustomModal';

const StyledLink = styled.div`
  cursor: pointer;
`;

const StyledLinkSpan = styled.span`
  color: #0062fe;
`;

const getHeader = value => {
  return (
    <Text
      size="p"
      variant="dark"
      fontWeight="bold"
      style={{
        textTransform: 'capitalize'
      }}
    >
      {value}
    </Text>
  );
};

export const ViewMissionPartnerRequestModal = ({
  viewRequestModal,
  missionPartnerId,
  userId,
  onClose,
  notify
}) => {
  const router = useRouter();
  const {
    findMissionPartnerRequestByIdData,
    findMissionPartnerRequestByIdLoading
  } = useFindMissionPartnerRequestById(missionPartnerId, userId);
  const { approveMissionPartnerRequest, approveMissionPartnerRequestLoading } =
    useApproveMissionPartnerRequest(missionPartnerId, userId);
  const { declineMissionPartnerRequest, declineMissionPartnerRequestLoading } =
    useDeclineMissionPartnerRequest(missionPartnerId, userId);

  const isLoading =
    findMissionPartnerRequestByIdLoading ||
    approveMissionPartnerRequestLoading ||
    declineMissionPartnerRequestLoading;

  const handleApproveMissionPartnerRequest = async () => {
    await approveMissionPartnerRequest()
      .then(() => {
        notify({
          palette: 'success',
          heading: `Access Approved`,
          description: `Mission Partner request Approved.`
        });
      })
      .catch(error => {
        notify({
          palette: 'danger',
          heading: 'Something went wrong. Try again.',
          description: error?.message
        });
      })
      .finally(() => {
        onClose();
      });
  };

  const handleDeclineMissionPartnerRequest = async () => {
    await declineMissionPartnerRequest()
      .then(() => {
        notify({
          palette: 'success',
          heading: `Access Denied`,
          description: `Mission Partner request Denied.`
        });
      })
      .catch(error => {
        notify({
          palette: 'error',
          heading: 'Something went wrong. Try again.',
          description: error?.message
        });
      })
      .finally(() => {
        onClose();
      });
  };

  const handleEmailClick = () => {
    const pathname = getRouteUrl(
      routeGenerators.MissionPartnerLearner({
        missionPartnerId,
        userId
      })
    );
    const query = new URLSearchParams({
      missionPartnerId,
      crumbNames: JSON.stringify(['MissionPartners', 'MissionPartner']),
      crumbParameters: JSON.stringify({
        missionPartnerId,
        missionPartnerName:
          findMissionPartnerRequestByIdData?.missionPartnerName
      }),
      userId
    }).toString();

    router.push(`${pathname}?${query}`);
  };

  return (
    <CustomModal
      customModal={viewRequestModal}
      onClose={onClose}
      title="Mission Partner Request"
    >
      {isLoading ? (
        <InlineLoading description="Loading..." />
      ) : (
        <>
          <Flex
            direction="column"
            justifyContent="space-between"
            gap={spacing[6]}
            style={{ marginRight: '5rem' }}
          >
            <Flex direction="row">
              <Flex direction="column" style={{ width: '50%' }}>
                <Text>{getHeader('Name')}</Text>
                <Text>{`${findMissionPartnerRequestByIdData?.userFirstName} ${findMissionPartnerRequestByIdData?.userLastName}`}</Text>
              </Flex>
              <Flex direction="column" style={{ width: '50%' }}>
                <Text>{getHeader('Email')}</Text>
                <Text>
                  <StyledLink onClick={handleEmailClick}>
                    <StyledLinkSpan>
                      {findMissionPartnerRequestByIdData?.userEmail}
                    </StyledLinkSpan>
                  </StyledLink>
                </Text>
              </Flex>
            </Flex>
            <Flex direction="row">
              <Flex direction="column" style={{ width: '50%' }}>
                <Text>{getHeader('Date')}</Text>
                <Text>
                  {abbreviatedDayDate(
                    findMissionPartnerRequestByIdData?.requestedAt
                  )}
                </Text>
              </Flex>
            </Flex>
          </Flex>
          <Flex direction="row" gap={spacing[3]} style={{ marginTop: '2rem' }}>
            <Button
              kind="pill-primary"
              onClick={handleApproveMissionPartnerRequest}
            >
              Approve
            </Button>
            <Button
              kind="pill-secondary"
              color="purple"
              onClick={handleDeclineMissionPartnerRequest}
            >
              Deny
            </Button>
          </Flex>
        </>
      )}
    </CustomModal>
  );
};
