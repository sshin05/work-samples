import {
  Flex,
  Text,
  Button,
  Switch,
  spacing,
  colors,
  TextInput,
  typography
} from '@digital-u/digital-ui';
import styled from '@emotion/styled';
import AlertBannerNotification from '@/components/alert-banner-notification/AlertBannerNotification';
import { Controller } from 'react-hook-form';
import { eventPreventDefaultOnReturn } from '@/utils/event-prevent-default-on-return';
import LinkInput from '@/components/link-input/LinkInput';
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

const CONTENT_MAX_LENGTH = 200;
const EMPTY_LINK_INNER = '<p></p>\n';

const AlertEditor = ({
  handleSubmit,
  handleEditChange,
  handlePublishAlert,
  setButtonIsLoading,
  allFields,
  control,
  isSubmitting,
  isValid,
  loading,
  buttonIsLoading,
  edit
}) => (
  <form onSubmit={eventPreventDefaultOnReturn}>
    <StyledFlex gap={spacing[8]} direction="column">
      <StyledTopText>
        The alert banner will appear on all of your learners’ Command Center,
        and is best used for important messages of which the whole community
        needs to be aware.
      </StyledTopText>

      <AlertBannerNotification
        heading={allFields.title}
        subheading={allFields.content}
        canClose={allFields.canClose}
      />

      <Controller
        control={control}
        name="title"
        render={({ field: { ref, ...rest } }) => (
          <div>
            <TextInput
              {...rest}
              id="title"
              label={
                <Flex justifyContent="space-between">
                  <Text size="label">Alert Title (optional)</Text>
                  <Text size="label">{`${allFields.title?.length}/100`}</Text>
                </Flex>
              }
              maxLength={100}
            />
          </div>
        )}
      />

      <Controller
        control={control}
        name="content"
        rules={{
          validate: {
            required: value => {
              if (value === EMPTY_LINK_INNER)
                return 'Alert content is required';
            }
          }
        }}
        render={({ field: { ref, ...rest } }) => (
          <LinkInput
            id="content"
            labelText="Alert Content*"
            hasCharacterCounter
            maxLength={CONTENT_MAX_LENGTH}
            width="100%"
            {...rest}
          />
        )}
      />

      <Flex gap={spacing[4]}>
        <Controller
          control={control}
          name="canClose"
          render={({ field: { ref, ...rest } }) => (
            <Switch kind="filled" buttonType="button" {...rest} />
          )}
        />

        <Text>Allow user to dismiss alert</Text>
      </Flex>
      <Flex gap={spacing[4]}>
        <ConfirmModal>
          <ConfirmActionModal
            heading="Publish Alert"
            description="This alert will be visible to all Digital University users"
            actionText="Confirm and publish"
            cancelText="Cancel"
            buttonContent="Publish"
            handleSubmit={handleSubmit(handlePublishAlert)}
            disabled={isSubmitting || !isValid || loading}
          />
        </ConfirmModal>
        {edit && (
          <Button
            kind="pill-secondary"
            type="button"
            onClick={() => {
              setButtonIsLoading(true);
              handleEditChange(false);
            }}
            disabled={isSubmitting || loading}
            loading={buttonIsLoading}
          >
            Cancel
          </Button>
        )}
        {loading && !buttonIsLoading && <InlineLoading />}
      </Flex>
    </StyledFlex>
  </form>
);

export default AlertEditor;
