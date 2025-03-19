'use client';
// ## PLACEHOLDER ##
// This file is a placeholder for the Manage Marketplace Products page. It is a work in progress and will be updated in a future release.

import { container, hstack, flex } from '@cerberus/styled-system/patterns';
import {
  Button,
  Field,
  FieldMessage,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalHeading,
  ModalDescription,
  useModal,
  trapFocus
} from '@cerberus/react';
import { css } from '@cerberus/styled-system/css';
import {
  sqlFindMarketplaceProducts,
  sqlCreateMarketplaceProduct
} from '@/app/api/marketplace/products';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { useCallback } from 'react';
import { useRouteParams } from '@/hooks/useRouteParams';
import { useSQLMutation, useSQLQuery } from '@/app/api';

const ManageMarketplaceProducts = () => {
  const { marketplaceVendorTag } = useRouteParams();

  const { data: marketplaceProducts, loading: marketplaceProductsLoading } =
    useSQLQuery(sqlFindMarketplaceProducts);
  const { mutation: createMarketplaceProduct } = useSQLMutation(
    sqlCreateMarketplaceProduct
  );

  const router = useRouter();

  const handleProductClick = sku => {
    router.push(`products/${sku}`);
  };

  const { modalRef, show, close } = useModal();
  const modalHandleKeyDown = trapFocus(modalRef);

  const handleSaveNewProduct = useCallback(async data => {
    createMarketplaceProduct({ ...data, marketplaceVendorTag });
    console.log('data', data);
    console.log('save');
    // await 2 seconds
    await new Promise(resolve => setTimeout(resolve, 2000));

    close();
  }, []);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm();

  return (
    <div>
      <div className={flex()}>
        <h2
          className={css({
            textStyle: 'h2',
            color: 'page.text.initial'
          })}
        >
          Manage Marketplace Products
        </h2>
      </div>

      <div className={container()}>
        <Button onClick={show}>Create New Product</Button>
        &nbsp;
        <Button
          onClick={() => {
            router.push(`products/upload`);
          }}
        >
          Upload Products...
        </Button>
        <div className={hstack()}></div>
        <h3
          className={css({
            textStyle: 'h2',
            color: 'page.text.initial'
          })}
        >
          Products
        </h3>
        <ul
          className={css({
            textStyle: 'body-md'
          })}
        >
          {marketplaceProductsLoading && <p>Loading...</p>}
          {!marketplaceProductsLoading &&
            marketplaceProducts?.records?.length === 0 && (
              <p>No products found.</p>
            )}
          {marketplaceProducts?.records?.map((product, index) => (
            <div className={css({ cursor: 'pointer' })} key={index}>
              <li
                key={product.id}
                onClick={() => handleProductClick(product.sku)}
                className={hstack()}
              >
                <h4>{product.title}</h4>
                <p>{product.shortDescription}</p>
                <img src={product.imagePath} alt={product.title} />
              </li>
            </div>
          ))}
        </ul>
      </div>

      <Modal onKeyDown={modalHandleKeyDown} ref={modalRef}>
        <ModalHeader>
          <ModalHeading>Create New Product</ModalHeading>
        </ModalHeader>
        <ModalDescription>
          Use this form to create a new marketplace product.
        </ModalDescription>

        <form onSubmit={handleSubmit(handleSaveNewProduct)}>
          <Controller
            name="title"
            control={control}
            defaultValue=""
            rules={{ required: 'A title is required.' }}
            render={({ field: { ref, ...field }, fieldState }) => (
              <Field {...fieldState}>
                <Label htmlFor="title">Title</Label>
                <Input
                  describedBy="help:title"
                  id="title"
                  placeholder="Product title"
                  type="text"
                  {...field}
                />
                <FieldMessage id="help:title">
                  The title of the product.
                </FieldMessage>
              </Field>
            )}
          />

          <Controller
            name="sku"
            control={control}
            defaultValue=""
            rules={{ required: 'A sku is required.' }}
            render={({ field: { ref, ...field }, fieldState }) => (
              <Field {...fieldState}>
                <Label htmlFor="sku">SKU</Label>
                <Input
                  describedBy="help:sku"
                  id="sku"
                  placeholder="SKU"
                  type="text"
                  {...field}
                />
                <FieldMessage id="help:sku">
                  The sku of the product.
                </FieldMessage>
              </Field>
            )}
          />

          <Controller
            name="shortDescription"
            control={control}
            defaultValue=""
            rules={{ required: 'A short description is required.' }}
            render={({ field: { ref, ...field }, fieldState }) => (
              <Field {...fieldState}>
                <Label htmlFor="shortDescription">Short Description</Label>
                <Input
                  describedBy="help:shortDescription"
                  id="shortDescription"
                  placeholder="Short description"
                  type="text"
                  {...field}
                />
                <FieldMessage id="help:shortDescription">
                  A short description of the product.
                </FieldMessage>
              </Field>
            )}
          />

          <Controller
            name="description"
            control={control}
            defaultValue=""
            rules={{ required: 'A description is required.' }}
            render={({ field: { ref, ...field }, fieldState }) => (
              <Field {...fieldState}>
                <Label htmlFor="description">Description</Label>
                <Input
                  describedBy="help:description"
                  id="description"
                  placeholder="Description"
                  type="text"
                  {...field}
                />
                <FieldMessage id="help:description">
                  A description of the product.
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
              {isSubmitting ? 'Saving...' : 'Save'}
            </Button>
            <Button usage="outlined" onClick={close} type="button">
              Close
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ManageMarketplaceProducts;
