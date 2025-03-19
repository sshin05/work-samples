'use client';
import { hstack, flex } from '@cerberus/styled-system/patterns';
import { Button, Field, FieldMessage, Label, Input } from '@cerberus/react';
import { css } from '@cerberus/styled-system/css';
import { sqlCreateMarketplaceVendor } from '@/app/api/marketplace/vendors';
import { useForm, Controller } from 'react-hook-form';
import React from 'react';
import { usePapaParse } from 'react-papaparse';
import { useSQLMutation } from '@/app/api';

const UploadMarketplaceVendors = () => {
  const {
    mutation: createMarketplaceVendor,
    error: createMarketplaceVendorError,
    data: _createMarketplaceVendorData
  } = useSQLMutation(sqlCreateMarketplaceVendor);

  const { readString } = usePapaParse();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm();

  const doUpload = async () => {
    const file = (document.getElementById('vendorCSV') as HTMLInputElement)
      ?.files[0];
    const fileAsString = await file.text();
    let data = null;
    console.log('File: ', fileAsString);
    readString(fileAsString, {
      header: true,
      complete: async results => {
        data = results.data;

        for (const vendor of data) {
          try {
            await createMarketplaceVendor(vendor);
          } catch (error) {
            console.error('Error creating vendor: ', error);
          }
        }
      }
    });
  };

  return (
    <div>
      <div className={flex()}>
        <h2
          className={css({
            textStyle: 'h2',
            color: 'page.text.initial'
          })}
        >
          Add Marketplace Vendors
        </h2>
      </div>

      <form onSubmit={handleSubmit(doUpload)}>
        <Controller
          name="vendorCSV"
          control={control}
          defaultValue=""
          rules={{ required: 'A vendorCSV is required.' }}
          render={({ field: { ref, ...field }, fieldState }) => (
            <Field {...fieldState}>
              <Label htmlFor="vendorCSV">Vendor CSV File</Label>
              <Input
                describedBy="help:vendorCSV"
                id="vendorCSV"
                placeholder="Vendor vendorCSV"
                type="file"
                //accepts=".csv"
                multiple={false}
                {...field}
              />
              <FieldMessage id="help:vendorCSV">
                The name of the vendor CSV file.
              </FieldMessage>
            </Field>
          )}
        />

        <div className={hstack()}>
          <Button
            disabled={isSubmitting}
            palette="action"
            shape="rounded"
            usage="filled"
            type="submit"
          >
            {isSubmitting ? 'Uploading...' : 'Upload'}
          </Button>
        </div>
      </form>
      {createMarketplaceVendorError ? (
        <p>{createMarketplaceVendorError}</p>
      ) : null}
    </div>
  );
};

export default UploadMarketplaceVendors;
