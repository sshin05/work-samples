import {
  Flex,
  Text,
  Button,
  spacing,
  colors,
  typography
} from '@digital-u/digital-ui';
import styled from '@emotion/styled';
import AlertBannerNotification from '@/components/alert-banner-notification/AlertBannerNotification';
import { InlineLoading } from '@/components_new/deprecated/InlineLoading';
import { ConfirmActionModal } from '@/components_new/modals/ConfirmActionModal';
import { ConfirmModal } from '@cerberus/react';

const StyledFlex = styled(Flex)`
  background-color: ${colors.white};
  padding: ${spacing[8]};
  border-radius: ${typography.sizes[1]};
`;

const StyledTopText = styled(Text)`
  font-size: ${typography.sizes[3.5]};
  font-family: ${typography.fontFamily.ibm};
`;

const AlertPreview = ({
  alertBannerContent,
  handleRemoveAlert,
  setButtonIsLoading,
  handleEditChange,
  buttonIsLoading,
  loading
}) => (
  <StyledFlex gap={spacing[8]} direction="column">
    <StyledTopText>
      The following alert is active on the Command Center for all learners.
    </StyledTopText>

    <AlertBannerNotification
      heading={alertBannerContent?.title}
      subheading={alertBannerContent?.content}
      canClose={alertBannerContent?.isDismissable}
    />

    <Flex gap={spacing[4]}>
      <ConfirmModal>
        <ConfirmActionModal
          heading="Remove alert"
          description="Are you sure you want to remove this alert from DU learners’ Command Center?"
          actionText="Confirm and remove"
          cancelText="No, keep alert"
          handleSubmit={handleRemoveAlert}
          buttonContent="Remove"
          disabled={loading}
        />
      </ConfirmModal>
      <Button
        kind="pill-secondary"
        disabled={loading}
        loading={buttonIsLoading}
        onClick={() => {
          setButtonIsLoading(true);
          handleEditChange(true);
        }}
      >
        Edit
      </Button>
      {loading && !buttonIsLoading && <InlineLoading />}
    </Flex>
  </StyledFlex>
);

export default AlertPreview;
