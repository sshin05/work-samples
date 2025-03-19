'use client';
// ## PLACEHOLDER ##
// This is a placeholder for the Manage Marketplace Product page. It is a work in progress and will be updated in a future release.

import {
  container,
  hstack,
  flex,
  vstack
} from '@cerberus/styled-system/patterns';
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
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { sqlGetMarketplaceProduct } from '@/app/api/marketplace/products';
import { useSQLQuery } from '@/app/api';
import { useRouteParams } from '@/hooks/useRouteParams';

const ProductDetails = () => {
  const { marketplaceVendorTag, productSku } = useRouteParams();

  const {
    data: getMarketplaceProductData,
    loading: getMarketplaceProductLoading
  } = useSQLQuery(sqlGetMarketplaceProduct, {
    options: {
      sku: productSku,
      marketplaceVendorTag
    }
  });

  const {
    handleSubmit,
    formState: { isSubmitting }
  } = useForm();

  const {
    modalRef: editModalRef,
    show: showEdit,
    close: closeEdit
  } = useModal();
  const editModalHandleKeyDown = trapFocus(editModalRef);

  const handleSaveEdit = useCallback(async () => {
    console.log('save');
    // await 2 seconds
    await new Promise(resolve => setTimeout(resolve, 2000));

    closeEdit();
  }, []);

  return (
    <div>
      <div className={flex()}>
        <h2
          className={css({
            textStyle: 'h2',
            color: 'page.text.initial'
          })}
        >
          {getMarketplaceProductLoading
            ? 'Loading...'
            : getMarketplaceProductData?.title}
        </h2>
      </div>

      <div className={container()}>
        <div className={vstack()}>
          <Button onClick={showEdit}>Edit Product Details</Button>
        </div>
      </div>

      <Modal onKeyDown={editModalHandleKeyDown} ref={editModalRef}>
        <ModalHeader>
          <ModalHeading>Edit {getMarketplaceProductData?.title}</ModalHeading>
        </ModalHeader>
        <ModalDescription>
          Edit the details of {getMarketplaceProductData?.title}.
        </ModalDescription>

        <form onSubmit={handleSubmit(handleSaveEdit)}>
          <Field required>
            <Label htmlFor="name">Product Name</Label>
            <Input
              describedBy="help:name"
              id="name"
              placeholder="Product Name"
              type="text"
              defaultValue={getMarketplaceProductData?.title}
            />
            <FieldMessage id="help:name">A name is required.</FieldMessage>
          </Field>
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
            <Button usage="outlined" onClick={closeEdit} type="button">
              Close
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
export default ProductDetails;
