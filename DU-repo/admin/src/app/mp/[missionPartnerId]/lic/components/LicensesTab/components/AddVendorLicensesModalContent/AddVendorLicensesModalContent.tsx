import { useState, useEffect } from 'react';
import { vstack, hstack } from '@cerberus/styled-system/patterns';
import { Button, Spinner } from '@cerberus/react';
import { Controller, useForm } from 'react-hook-form';
import { useFindLicensedVendors } from '@/api/vendor';
import { css } from '@cerberus/styled-system/css';
import { StandardModalHeader } from '@/components_new/modals/StandardModalHeader';
import { TextInput, FieldSelect } from '@/components_new/form';

export const AddVendorLicensesModalContent = ({
  onSubmit,
  onClose,
  vendorToEdit,
  isDuAdmin
}) => {
  const [vendorOptions, setVendorOptions] = useState([]);
  const [error, setError] = useState(null);

  const { licensedVendors, licensedVendorsLoading } = useFindLicensedVendors();
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting }
  } = useForm({
    defaultValues: {
      vendorId: vendorToEdit?.vendorId || '',
      provisioned: vendorToEdit?.provisioned || 0,
      autoAssignmentEnabled: vendorToEdit?.autoAssignmentEnabled || 'enabled'
    }
  });
  const loading = licensedVendorsLoading || isSubmitting;

  const handleAddVendor = async data => {
    setError(null);

    const newVendorObject = {
      vendorId: data.vendorId,
      vendorName: licensedVendors.find(v => v.id === data.vendorId).name,
      provisioned: Number(data.provisioned),
      autoAssignmentEnabled: Boolean(data.autoAssignmentEnabled)
    };

    try {
      await onSubmit(newVendorObject);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    if (licensedVendorsLoading) return;
    setVendorOptions(
      (licensedVendors || []).map(vendor => ({
        label: vendor.name,
        value: vendor.id
      }))
    );

    if (vendorToEdit) {
      setValue('vendorId', vendorToEdit.vendorId);
      setValue('provisioned', vendorToEdit.provisioned);
      setValue('autoAssignmentEnabled', vendorToEdit.autoAssignmentEnabled);
    } else {
      setValue('vendorId', licensedVendors[0]?.id || '');
    }
  }, [licensedVendors, licensedVendorsLoading, vendorToEdit, setValue]);

  const autoAssignmentOptions = [
    {
      label: 'Enabled',
      value: 'enabled'
    },
    {
      label: 'Disabled',
      value: 'disabled'
    }
  ];

  const closeModal = () => {
    reset();
    onClose();
  };

  return (
    <>
      <StandardModalHeader
        title={vendorToEdit ? `Edit ${vendorToEdit.vendorName}` : 'New vendor'}
        onClose={closeModal}
      />
      <form
        className={vstack({
          gap: '4',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          mt: '4'
        })}
        onSubmit={handleSubmit(handleAddVendor)}
      >
        {!vendorToEdit && (
          <Controller
            name="vendorId"
            disabled={Boolean(vendorToEdit)}
            control={control}
            rules={{ required: 'Vendor is required' }}
            render={({ field: { ref, ...field } }) => (
              <FieldSelect
                {...field}
                label="Select vendor"
                options={vendorOptions}
                required
              />
            )}
          />
        )}
        <Controller
          name="provisioned"
          control={control}
          disabled={Boolean(!isDuAdmin)}
          rules={{
            required: 'Licenses purchased is required',
            min: {
              value: 0,
              message: 'Licenses purchased must be greater than 0'
            }
          }}
          render={({ field: { ref, ...field }, fieldState: { error } }) => (
            <TextInput
              {...field}
              label="Licenses purchased"
              type="number"
              errorMessage={error?.message}
              required
            />
          )}
        />
        <Controller
          name="autoAssignmentEnabled"
          control={control}
          render={({ field: { ref, ...field } }) => (
            <FieldSelect
              {...field}
              label="Auto assignment"
              options={autoAssignmentOptions}
              required
            />
          )}
        />
        {error && (
          <p className={css({ color: 'danger.text.200' })}>{error.message}</p>
        )}
        <div
          className={hstack({
            gap: '4',
            mt: '4'
          })}
        >
          <Button
            type="submit"
            disabled={loading}
            palette="action"
            shape="rounded"
            usage="filled"
          >
            {loading ? (
              <>
                Loading
                <Spinner size="1em" />
              </>
            ) : vendorToEdit ? (
              'Save'
            ) : (
              'Add'
            )}
          </Button>
          <Button
            onClick={closeModal}
            disabled={loading}
            palette="action"
            shape="rounded"
            usage="outlined"
            color="black"
            type="button"
          >
            Cancel
          </Button>
        </div>
      </form>
    </>
  );
};
