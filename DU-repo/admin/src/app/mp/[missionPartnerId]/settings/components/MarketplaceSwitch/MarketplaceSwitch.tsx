import { useState } from 'react';
import type { MarketplaceSwitchProps } from './MarketplaceSwitchProps';
import { Field, Label, Toggle, useNotificationCenter } from '@cerberus/react';
import { useSQLMutation } from '@/app/api';
import { sqlUpdateIsMarketplaceEnabled } from '@/app/api/mission-partner';
import { VStack } from 'styled-system/jsx';
import { css } from '@cerberus/styled-system/css';

export const MarketplaceSwitch = ({
  missionPartner,
  canUserEdit
}: MarketplaceSwitchProps) => {
  const {
    mutation: updateMarketplaceEnabled,
    loading: updateMarketplaceEnabledLoading
  } = useSQLMutation(sqlUpdateIsMarketplaceEnabled);
  const { notify } = useNotificationCenter();
  const [marketplaceEnabled, setMarketplaceEnabled] = useState(
    Boolean(missionPartner?.isMarketplaceEnabled)
  );

  const handleMarketplaceChange = async (newValue: boolean) => {
    const enableDisableString = newValue ? 'enabled' : 'disabled';

    await updateMarketplaceEnabled({
      id: missionPartner?.id,
      isMarketplaceEnabled: !missionPartner?.isMarketplaceEnabled
    })
      .then(() => {
        notify({
          palette: 'success',
          heading: 'Success',
          description: `Marketplace ${enableDisableString} for non-admins.`
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
    <VStack pl="6" alignItems="flex-start">
      <div className={css({ fontStyle: 'normal', fontWeight: 'bold' })}>
        Marketplace features
      </div>
      <Field disabled={updateMarketplaceEnabledLoading || !canUserEdit}>
        <Label htmlFor="marketplaceEnabled">
          Give Mission Partners access to Sot-X.
        </Label>
        <Toggle
          checked={marketplaceEnabled}
          value={String(missionPartner?.isMarketplaceEnabled)}
          onChange={e => {
            setMarketplaceEnabled(e.target.checked);
            handleMarketplaceChange(e.target.checked);
          }}
          id="marketplaceEnabled"
        />
      </Field>
    </VStack>
  );
};
