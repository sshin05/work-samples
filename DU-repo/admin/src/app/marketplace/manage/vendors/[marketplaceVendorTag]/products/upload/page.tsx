'use client';
// ## PLACEHOLDER ##
// This file is a placeholder for the Manage Marketplace Products page. It is a work in progress and will be updated in a future release.

import { hstack, flex } from '@cerberus/styled-system/patterns';
import { Button, Field, FieldMessage, Label, Input } from '@cerberus/react';
import { css } from '@cerberus/styled-system/css';
import { sqlUpdateMarketplaceProduct } from '@/app/api/marketplace/products';
import { useForm, Controller } from 'react-hook-form';
import { usePapaParse } from 'react-papaparse';
import { useSQLMutation } from '@/app/api';

const ManageMarketplaceProducts = () => {
  const {
    mutation: updateMarketplaceProduct,
    error: updateMarketplaceProductError
  } = useSQLMutation(sqlUpdateMarketplaceProduct);

  const { readString } = usePapaParse();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm();

  const doUpload = async () => {
    const productFile = (
      document.getElementById('productCSV') as HTMLInputElement
    )?.files[0];
    const productFileAsString = await productFile.text();
    const customizeFile = (
      document.getElementById('customizeCSV') as HTMLInputElement
    )?.files[0];
    const customizeFileAsString = await customizeFile.text();

    let customizeData = null;
    let productData = null;

    // read in the customizations file first
    readString(customizeFileAsString, {
      header: true,
      complete: results => {
        console.log('Parsed customization data: ', results.data);
        customizeData = results.data;
      }
    });

    readString(productFileAsString, {
      header: true,
      complete: results => {
        console.log('Parsed product data: ', results.data);
        productData = results.data;
      }
    });

    // combine the data
    const combinedData = {};
    productData.forEach(product => {
      const sku = product.sku;
      const vendor = product.marketplaceVendorTag;
      combinedData[vendor + ':' + sku] = { ...product };
      combinedData[vendor + ':' + sku].customizations = [];
      combinedData[vendor + ':' + sku].durationInHours = parseInt(
        combinedData[vendor + ':' + sku].durationInHours
      );
    });
    console.log('Combined data before customizations: ', combinedData);

    customizeData.forEach(customization => {
      console.log('Customization: ', customization);

      const parseBool = value => {
        switch (value?.toLowerCase().trim()) {
          case 'true':
            return true;
          case 'yes':
            return false;
          case '1':
            return false;
          default:
            return false;
        }
      };

      customization.min = isNaN(parseInt(customization.min))
        ? 0
        : parseInt(customization.min);
      customization.max = isNaN(parseInt(customization.max))
        ? 0
        : parseInt(customization.max);
      customization.description =
        customization.description || customization.name;
      customization.displayOrder = parseInt(customization.displayOrder);
      customization.requiredToSubmit = parseBool(
        customization.requiredToSubmit
      );
      customization.requiredToFinalize = parseBool(
        customization.requiredToFinalize
      );
      console.log(
        'Customization list options BEFORE: ',
        customization.listOptions
      );
      customization.listOptions = customization.listOptions.split('|');
      console.log(
        'Customization list options AFTER: ',
        customization.listOptions
      );

      const sku = customization.marketplaceProductSku;
      const vendor = customization.marketplaceVendorTag;
      combinedData[vendor + ':' + sku] = {
        ...combinedData[vendor + ':' + sku],
        customizations: [
          ...combinedData[vendor + ':' + sku].customizations,
          { ...customization }
        ]
      };
    });

    console.log('Combined data after customizations: ', combinedData);

    // upload the data
    Object.keys(combinedData).forEach(async key => {
      const product = { ...combinedData[key], shouldCreate: true };
      console.log('Creating Product: ', product);
      try {
        console.log('updating product: ', product);
        await updateMarketplaceProduct(product);
      } catch (error) {
        console.error('Error creating product: ', error);
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
          Add Marketplace Products
        </h2>
      </div>

      <form onSubmit={handleSubmit(doUpload)}>
        <Controller
          name="productCSV"
          control={control}
          defaultValue=""
          rules={{ required: 'A productCSV is required.' }}
          render={({ field: { ref, ...field }, fieldState }) => (
            <Field {...fieldState}>
              <Label htmlFor="productCSV">Product CSV File</Label>
              <Input
                describedBy="help:productCSV"
                id="productCSV"
                placeholder="Product productCSV"
                type="file"
                //accepts=".csv"
                multiple={false}
                {...field}
              />
              <FieldMessage id="help:productCSV">
                The name of the product CSV file.
              </FieldMessage>
            </Field>
          )}
        />

        <Controller
          name="customizeCSV"
          control={control}
          defaultValue=""
          rules={{ required: 'A customizeCSV is required.' }}
          render={({ field: { ref, ...field }, fieldState }) => (
            <Field {...fieldState}>
              <Label htmlFor="customizeCSV">Customizations CSV File</Label>
              <Input
                describedBy="help:customizeCSV"
                id="customizeCSV"
                placeholder="Customizations customizeCSV"
                type="file"
                //accepts=".csv"
                multiple={false}
                {...field}
              />
              <FieldMessage id="help:customizeCSV">
                The name of the customizations CSV file.
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

      {updateMarketplaceProductError ? (
        <p>Error: {updateMarketplaceProductError}</p>
      ) : null}
    </div>
  );
};

export default ManageMarketplaceProducts;
