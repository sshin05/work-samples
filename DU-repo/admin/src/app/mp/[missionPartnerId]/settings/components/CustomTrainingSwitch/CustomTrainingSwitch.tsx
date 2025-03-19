import { useState } from 'react';
import type { CustomTrainingSwitchProps } from './CustomTrainingSwitchProps';
import { Field, Label, Toggle, useNotificationCenter } from '@cerberus/react';
import { useUpdateCustomTrainingEnabled } from '@/api/mission-partner';
import { VStack } from 'styled-system/jsx';
import { css } from '@cerberus/styled-system/css';
import { containerStyles } from '@/app/styles/ContainerStyles';

// note:  previously, canUserEdit was 2 rules:
// 1) isDuAdmin AND
// 2) `useFindAllSettings().result.[id="exchange"].enabled`, but based on the following ticket, this must not be valid anymore:
// https://repo.bespin.cce.af.mil/bespin/products/digital-u/licensed/digital-university/-/issues/6601

export const CustomTrainingSwitch = ({
  missionPartner,
  canUserEdit
}: CustomTrainingSwitchProps) => {
  const { updateCustomTrainingEnabled, updateCustomTrainingEnabledLoading } =
    useUpdateCustomTrainingEnabled();
  const { notify } = useNotificationCenter();
  const [customTrainingEnabled, setCustomTrainingEnabled] = useState(
    Boolean(missionPartner?.customTrainingEnabled)
  );

  const handleCustomTrainingChange = async (newValue: boolean) => {
    const enableDisableString = newValue ? 'enabled' : 'disabled';

    await updateCustomTrainingEnabled({
      id: missionPartner?.id,
      customTrainingEnabled: !missionPartner?.customTrainingEnabled
    })
      .then(() => {
        notify({
          palette: 'success',
          heading: 'Success',
          description: `Custom training ${enableDisableString} for non-admins.`
        });
      })
      .catch(error => {
        notify({
          palette: 'danger',
          heading: 'Error',
          description: `Error: ${error?.message}`
        });
      });
  };

  return (
    <VStack className={containerStyles} p="6" alignItems="flex-start">
      <div className={css({ textStyle: 'heading-xs' })}>Custom Training</div>
      <Field disabled={updateCustomTrainingEnabledLoading || !canUserEdit}>
        <Label htmlFor="customTrainingEnabled">
          Let Mission Partner admins create their own training.
        </Label>
        <Toggle
          checked={customTrainingEnabled}
          value={String(missionPartner?.customTrainingEnabled)}
          onChange={e => {
            setCustomTrainingEnabled(e.target.checked);
            handleCustomTrainingChange(e.target.checked);
          }}
          id="customTrainingEnabled"
        />
      </Field>
    </VStack>
  );
};
