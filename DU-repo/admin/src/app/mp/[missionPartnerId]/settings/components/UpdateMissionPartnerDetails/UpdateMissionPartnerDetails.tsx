import { useFindAllAffiliates } from '@/api/affiliate';
import { useUpdateMissionPartner } from '@/api/mission-partner';
import {
  useConfirmModal,
  useNotificationCenter,
  Button
} from '@cerberus/react';
import { Checkbox } from '@/components_new/form/Checkbox/Checkbox';
import { css } from '@cerberus/styled-system/css';
import { useCallback, useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { sectionOptions } from '@/app/mp/utils/mpUtils';
import { stickySaveButtonStyles } from './updateMissionPartnerDetails.styles';
import { vstack } from '@cerberus/styled-system/patterns';
import { FieldSelect, TextInput } from '@/components_new/form';

const MAX_NAME_LENGTH = 60;

export const UpdateMissionPartnerDetails = ({ missionPartner }) => {
  const [notifyUsers, setNotifyUsers] = useState(false);
  const { updateMissionPartner, updateMissionPartnerLoading } =
    useUpdateMissionPartner();
  const { affiliates, affiliatesLoading, affiliatesError } =
    useFindAllAffiliates();
  const [affiliateOptions, setAffiliateOptions] = useState([]);
  const { notify } = useNotificationCenter();
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, isDirty, dirtyFields },
    watch,
    setValue,
    unregister
  } = useForm({
    defaultValues: {
      name: missionPartner?.name,
      affiliation: missionPartner?.affiliateId,
      section: missionPartner?.sectionType
    }
  });
  const affiliation = watch('affiliation');

  useEffect(() => {
    reset({
      name: missionPartner?.name,
      affiliation: missionPartner?.affiliateId,
      section: missionPartner?.sectionType
    });
  }, [missionPartner, reset]);

  useEffect(() => {
    if (
      affiliates &&
      affiliates.length > 0 &&
      !affiliatesLoading &&
      !affiliatesError
    ) {
      const options = [
        ...affiliates.map(affiliate => ({
          label: affiliate.name,
          value: affiliate.id
        }))
      ];
      setAffiliateOptions(options);
    }
  }, [affiliates, affiliatesLoading, affiliatesError]);

  useEffect(() => {
    if (affiliation !== 'space-force') {
      setValue('section', undefined);
      unregister('section');
    }
  }, [affiliation, setValue, unregister]);

  const handleUpdateMissionPartner = useCallback(
    async data => {
      try {
        await updateMissionPartner({
          id: missionPartner.id,
          name: data.name,
          affiliateId: data.affiliation,
          sectionType: data.section ? data.section : missionPartner?.sectionType
        });
        notify({
          palette: 'success',
          heading: 'Success',
          description: 'Mission partner updated.'
        });

        if (notifyUsers) {
          // notify users
          // to be covered in ticket 6603
        }
      } catch {
        notify({
          palette: 'danger',
          heading: 'Error',
          description: 'Failed to update mission partner.'
        });
      }
    },
    [
      missionPartner.id,
      missionPartner?.sectionType,
      notify,
      notifyUsers,
      updateMissionPartner
    ]
  );

  const confirmUpdateMissionPartnerModal = useConfirmModal();
  const handleConfirmUpdateMissionPartner = async () => {
    const dirtyFieldsKeys = Object.keys(dirtyFields);
    let formattedKeys = '';

    if (dirtyFieldsKeys.length === 1) {
      formattedKeys = dirtyFieldsKeys[0];
    } else if (dirtyFieldsKeys.length === 2) {
      formattedKeys = dirtyFieldsKeys.join(' and ');
    } else if (dirtyFieldsKeys.length > 2) {
      formattedKeys =
        dirtyFieldsKeys.slice(0, -1).join(', ') +
        ', and ' +
        dirtyFieldsKeys[dirtyFieldsKeys.length - 1];
    }

    const consent = await confirmUpdateMissionPartnerModal.show({
      heading: `Are you sure you want to change this mission partner ${formattedKeys}?`,
      description: (
        <Checkbox
          onChange={() => setNotifyUsers(!notifyUsers)}
          name="notify-users"
          labelText="Notify users about these changes?"
          labelSize="md"
        />
      ),
      actionText: 'Confirm',
      cancelText: 'Cancel'
    });

    if (consent) handleSubmit(handleUpdateMissionPartner)();
  };

  return (
    <form
      className={vstack({ gap: '8', alignItems: 'flex-start', minW: '96' })}
      onSubmit={handleSubmit(handleConfirmUpdateMissionPartner)}
    >
      <Controller
        name="name"
        control={control}
        rules={{
          required: 'Name is required',
          maxLength: {
            value: MAX_NAME_LENGTH,
            message: 'Name cannot be longer than 60 characters'
          },
          validate: value => {
            const forbiddenCharacters = ['!', '@', '#', '$'];
            return forbiddenCharacters.some(char => value.includes(char))
              ? 'Name contains forbidden characters: !, @, #, $'
              : true;
          }
        }}
        disabled={updateMissionPartnerLoading}
        render={({ field: { ref, ...field }, fieldState: { error } }) => (
          <TextInput
            {...field}
            className={css({ minW: '96' })}
            label="Name"
            disabled={isSubmitting}
            required
            max={MAX_NAME_LENGTH}
            errorMessage={error?.message}
          />
        )}
      />
      <Controller
        name="affiliation"
        control={control}
        rules={{
          required: 'Affiliate is required'
        }}
        disabled={updateMissionPartnerLoading}
        render={({ field: { ref, ...field }, fieldState: { error } }) => (
          <FieldSelect
            {...field}
            label="Affiliation"
            options={affiliateOptions}
            errorMessage={error?.message}
            className={css({ bgColor: 'page.surface.100' })}
            required
          />
        )}
      />
      {affiliation === 'space-force' && (
        <Controller
          name="section"
          control={control}
          rules={{
            required: 'Section is required'
          }}
          disabled={updateMissionPartnerLoading}
          render={({ field: { ref, ...field }, fieldState: { error } }) => (
            <FieldSelect
              {...field}
              label="Section"
              options={sectionOptions}
              errorMessage={error?.message}
              className={css({ bgColor: 'page.surface.100' })}
              required
            />
          )}
        />
      )}
      {isDirty && (
        <div className={stickySaveButtonStyles}>
          <Button
            palette="action"
            shape="rounded"
            usage="filled"
            type="submit"
            disabled={isSubmitting || updateMissionPartnerLoading}
          >
            Save
          </Button>
          <Button
            palette="action"
            shape="rounded"
            usage="outlined"
            type="button"
            disabled={isSubmitting || updateMissionPartnerLoading}
            onClick={() => reset()}
          >
            Cancel
          </Button>
        </div>
      )}
    </form>
  );
};
