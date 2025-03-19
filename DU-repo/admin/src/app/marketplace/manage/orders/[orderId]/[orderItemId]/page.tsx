'use client';
// ## PLACEHOLDER ##
// This is a placeholder for the Manage Marketplace Order Item page. It is a work in progress and will be updated in a future release.

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
import { useRouteParams } from '@/hooks/useRouteParams';

const OrderItemDetails = () => {
  const { orderId, orderItemId } = useRouteParams();

  // Temp data
  const marketplaceOrderItems = [
    {
      id: 'test-orderItem-001',
      name: 'OrderItem 1'
    },
    {
      id: 'test-orderItem-002',
      name: 'OrderItem 2'
    }
  ];

  const marketplaceOrderItem = marketplaceOrderItems.find(
    orderItem => orderItem.id === orderItemId
  );
  const marketplaceOrderItemLoading = false;

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
          {marketplaceOrderItemLoading
            ? 'Loading...'
            : marketplaceOrderItem?.name}
        </h2>
      </div>

      <div className={container()}>
        <div className={vstack()}>
          <Button onClick={showEdit}>
            Edit order {orderId} OrderItem Details for orderItemId:{' '}
            {orderItemId}
          </Button>
        </div>
      </div>

      <Modal onKeyDown={editModalHandleKeyDown} ref={editModalRef}>
        <ModalHeader>
          <ModalHeading>Edit {marketplaceOrderItem?.name}</ModalHeading>
        </ModalHeader>
        <ModalDescription>
          Edit the details of {marketplaceOrderItem?.name}.
        </ModalDescription>

        <form onSubmit={handleSubmit(handleSaveEdit)}>
          <Field required>
            <Label htmlFor="name">OrderItem Name</Label>
            <Input
              describedBy="help:name"
              id="name"
              placeholder="OrderItem Name"
              type="text"
              defaultValue={marketplaceOrderItem?.name}
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

export default OrderItemDetails;
