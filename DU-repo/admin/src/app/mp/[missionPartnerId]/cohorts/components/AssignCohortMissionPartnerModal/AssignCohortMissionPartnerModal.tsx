import { Button, Flex, Text } from '@digital-u/digital-ui';
import { useForm, Controller } from 'react-hook-form';
import { useFindAllMissionPartnersAdminPortal } from '@/api/mission-partner';
import { AdminUiSelect } from '@/components_new/deprecated/AdminUiSelect';
import { InlineLoading } from '@/components_new/deprecated/InlineLoading';
import { CustomModal } from '@/components_new/modals/CustomModal';
import type { UseModalReturnValue } from '@cerberus/react';

interface AssignCohortMissionPartnerModalProps {
  assignCohortMissionPartnerModal: UseModalReturnValue;
  onSubmit: (missionPartnerId?: string) => Promise<void>;
  onClose: (doRefetch?: boolean) => void;
  group: {
    id?: string;
    missionPartnerId?: string;
  };
  title?: string;
}

export const AssignCohortMissionPartnerModal = ({
  assignCohortMissionPartnerModal,
  onSubmit,
  onClose,
  group,
  title = 'Assign Mission Partner'
}: AssignCohortMissionPartnerModalProps) => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { isSubmitting }
  } = useForm({
    defaultValues: {
      title: '',
      type: 'mission partner',
      missionPartner: ''
    }
  });

  const missionPartner = watch('missionPartner');

  const { missionPartners, missionPartnersLoading: isLoading } =
    useFindAllMissionPartnersAdminPortal();

  const handleSubmitForm = async () => {
    await onSubmit(missionPartner);
    onClose(true);
  };

  return (
    <CustomModal
      customModal={assignCohortMissionPartnerModal}
      title={title}
      onClose={() => onClose(false)}
    >
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        {isLoading ? (
          <Flex>
            <InlineLoading description="Loading..." />
          </Flex>
        ) : (
          <Flex direction="column" gap="1.5rem">
            {missionPartners.length > 0 ? (
              <Controller
                name="missionPartner"
                control={control}
                rules={{
                  required: 'The mission partner is required.'
                }}
                render={({
                  field: { ref, ...register },
                  fieldState: { error }
                }) => (
                  <AdminUiSelect
                    {...register}
                    id="mission-partner-select"
                    options={[
                      {
                        label: 'Select a Mission Partner',
                        value: null,
                        //@ts-expect-error - Object literal may only specify known properties,
                        // and 'selected' does not exist in type
                        //'{ label: string; value?: string; options?: { label: string; value?: string; }[]; }'.ts(2353)
                        selected: !group.missionPartnerId,
                        disabled: true
                      },
                      ...missionPartners.map(missionPartner => ({
                        label: missionPartner.name,
                        value: missionPartner.id,
                        selected: missionPartner.id === group.missionPartnerId
                      }))
                    ]}
                    invalidText={error?.message}
                    invalid={Boolean(error)}
                  />
                )}
              />
            ) : (
              <Text>No Mission Partners Avaliable</Text>
            )}
            <Flex direction="row" gap="0.5rem" justifyContent="flex-end">
              <Button
                aria-label="Cancel Button"
                kind="pill-secondary"
                color="black"
                type="button"
                onClick={() => onClose(false)}
              >
                Cancel
              </Button>
              <Button
                aria-label="Confirm Button"
                kind="pill-primary"
                type="submit"
                disabled={isSubmitting}
              >
                Confirm
              </Button>
            </Flex>
          </Flex>
        )}
      </form>
    </CustomModal>
  );
};
