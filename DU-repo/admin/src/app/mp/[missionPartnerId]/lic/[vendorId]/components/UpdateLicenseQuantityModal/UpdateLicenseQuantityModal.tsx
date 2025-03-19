import { Button, ModalHeader, ModalHeading } from '@cerberus/react';
import { useState } from 'react';
import { TextInput } from '@/components_new/form';
import { hstack, vstack } from '@cerberus/styled-system/patterns';
import type { UpdateLicenseQuantityModalProps } from './updateLicenseQuantityModal.types';
import { css } from '@cerberus/styled-system/css';

const MAX_INT_SIZE_GQL = 2147483647;

export const UpdateLicenseQuantityModal = ({
  vendor,
  handleUpdateMissionPartner,
  close
}: UpdateLicenseQuantityModalProps) => {
  const [licenseQuantity, setLicenseQuantity] = useState(
    String(vendor?.provisioned)
  );

  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = () => {
    const newVendorObject = {
      vendorId: vendor.vendorId,
      vendorName: vendor.vendorName,
      provisioned: Number(licenseQuantity),
      autoAssignmentEnabled: vendor.autoAssignmentEnabled
    };

    handleUpdateMissionPartner(newVendorObject);
    close();
  };

  const validateNumberInput = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    const invalidChars = ['-', '+', 'e']; //prevent very large or negative numbers or arithmetic expressions
    if (invalidChars.includes(event.key)) {
      event.preventDefault();
    }
  };

  const handleBlur = () => {
    if (licenseQuantity === '') {
      setErrorMessage('License quantity cannot be empty');
    } else if (Number(licenseQuantity) > MAX_INT_SIZE_GQL) {
      setErrorMessage('Allocated amount is too large');
    } else {
      setErrorMessage(null);
    }
  };

  return (
    <>
      <ModalHeader className={css({ mb: '4' })}>
        <ModalHeading>Update license quantity</ModalHeading>
      </ModalHeader>
      <div className={vstack({ alignItems: 'flex-start' })}>
        <TextInput
          className={css({ w: '31rem' })}
          name="licenseQuantity"
          label="Enter the number of licenses provisioned"
          type="number"
          min={0}
          onChange={e => {
            setErrorMessage(null);
            setLicenseQuantity(e.target.value);
          }}
          onKeyDown={validateNumberInput}
          onBlur={handleBlur}
          defaultValue={vendor?.provisioned}
          errorMessage={errorMessage}
          required
        />
        <div
          className={hstack({
            gap: '4',
            w: 'full',
            justifyContent: 'space-between',
            mt: '16'
          })}
        >
          <Button
            className={css({ w: 'full' })}
            palette="action"
            shape="rounded"
            usage="filled"
            type="submit"
            disabled={Number(licenseQuantity) < 0 || Boolean(errorMessage)}
            onClick={handleSubmit}
          >
            Confirm
          </Button>
          <Button
            className={css({ w: 'full' })}
            palette="action"
            shape="rounded"
            usage="outlined"
            onClick={close}
          >
            Cancel
          </Button>
        </div>
      </div>
    </>
  );
};
